'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect } from 'react';

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    maxSteps: 10,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg mb-2">Welcome to the Bookshelf Designer!</p>
            <p className="text-sm">I&apos;ll help you design a custom bookshelf.</p>
            <p className="text-sm mt-2">What height would you like your bookshelf to be?</p>
          </div>
        )}
        
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-lg ${
              m.role === 'user'
                ? 'bg-blue-100 ml-auto max-w-[80%]'
                : 'bg-gray-100 mr-auto max-w-[90%]'
            }`}
          >
            <div className="text-sm whitespace-pre-wrap">
              {m.content}
            </div>
            
            {/* Display tool results if any */}
            {m.toolInvocations && m.toolInvocations.length > 0 && (
              <div className="mt-3 border-t pt-2">
                {m.toolInvocations.map((tool) => (
                  <div key={tool.toolCallId} className="text-xs">
                    {tool.state === 'result' && tool.result && (
                      <ToolResult result={tool.result} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="bg-gray-100 rounded-lg p-3 mr-auto max-w-[80%]">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}

// Component to display tool execution results
function ToolResult({ result }: { result: any }) {
  if (!result?.specification) {
    return <div className="text-gray-500">Processing...</div>;
  }

  const spec = result.specification;

  return (
    <div className="bg-green-50 border rounded-lg p-3 text-xs">
      <h3 className="font-semibold text-green-800 mb-2">
        ✓ Bookshelf Specification Generated
      </h3>
      
      <div className="mb-3">
        <h4 className="font-medium text-green-700">Dimensions</h4>
        <p>{spec.overallDimensions.height}" × {spec.overallDimensions.width}" × {spec.overallDimensions.depth}"</p>
        <p className="text-gray-600">Interior: {spec.interiorDimensions.height}" × {spec.interiorDimensions.width}" × {spec.interiorDimensions.depth}"</p>
      </div>
      
      <div className="mb-3">
        <h4 className="font-medium text-green-700">Shelves</h4>
        <p>{spec.shelfConfiguration.adjustableShelfCount} adjustable shelves</p>
        <p className="text-gray-600">Gap height: {spec.shelfConfiguration.gapHeight}"</p>
      </div>
      
      <div className="mb-3">
        <h4 className="font-medium text-green-700">Materials</h4>
        <p>Carcass: {spec.materials.carcassThickness}" plywood</p>
        <p>Back panel: {spec.materials.backPanelThickness}" plywood</p>
      </div>
      
      {spec.lumberHints && (
        <div className="mb-3">
          <h4 className="font-medium text-green-700">Lumber Estimate</h4>
          <p>~{spec.lumberHints.recommendedSheetQty} sheets of 4×8 plywood</p>
          <p className="text-gray-600">Waste: {spec.lumberHints.estimatedWaste}</p>
        </div>
      )}
      
      <div className="mb-3">
        <h4 className="font-medium text-green-700">Cut List ({spec.cutList.length} parts)</h4>
        <div className="mt-1 space-y-1">
          {spec.cutList.slice(0, 6).map((part: any, i: number) => (
            <p key={i} className="text-gray-600">
              • {part.name}: {part.length}" × {part.width}"
            </p>
          ))}
          {spec.cutList.length > 6 && (
            <p className="text-gray-500">...and {spec.cutList.length - 6} more parts</p>
          )}
        </div>
      </div>
      
      {spec.designAssumptions && spec.designAssumptions.length > 0 && (
        <div>
          <h4 className="font-medium text-green-700">Design Assumptions</h4>
          <ul className="mt-1 space-y-1">
            {spec.designAssumptions.slice(0, 5).map((assumption: string, i: number) => (
              <li key={i} className="text-gray-600">• {assumption}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}