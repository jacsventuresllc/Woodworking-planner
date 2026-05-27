"use client";

import { useState } from "react";
import { 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  FileText, 
  Scissors, 
  ListOrdered,
  Download,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

type Step = "upload" | "analyze" | "bom" | "cutlist" | "instructions";

interface Component {
  name: string;
  material: string;
  dimensions: string;
  quantity: number;
  confidence: number;
}

interface BOMItem {
  item: string;
  material: string;
  quantity: number;
  dimensions: string;
  notes: string;
}

interface CutListItem {
  piece: string;
  material: string;
  length: number;
  width: number;
  thickness: number;
  quantity: number;
  kerfAdjust: number;
}

interface Instruction {
  step: number;
  description: string;
  tips: string;
  timeEstimate: string;
}

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [projectName, setProjectName] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [skillLevel, setSkillLevel] = useState<"beginner" | "intermediate">("beginner");
  const [kerfWidth, setKerfWidth] = useState(3.0);

  // Demo data (will be replaced with AI response)
  const [components, setComponents] = useState<Component[]>([]);
  const [bom, setBom] = useState<BOMItem[]>([]);
  const [cutList, setCutList] = useState<CutListItem[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!projectName || !uploadedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (replace with actual API call)
    setTimeout(() => {
      setComponents([
        { name: "Table Top", material: "Hardwood", dimensions: "48\" x 30\"", quantity: 1, confidence: 0.92 },
        { name: "Legs", material: "Hardwood", dimensions: "2\" x 2\" x 28\"", quantity: 4, confidence: 0.88 },
        { name: "Apron", material: "Hardwood", dimensions: "1\" x 4\" x 44\"", quantity: 2, confidence: 0.85 },
        { name: "Support Beam", material: "Hardwood", dimensions: "1\" x 3\" x 44\"", quantity: 1, confidence: 0.78 },
      ]);
      setCurrentStep("analyze");
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateBOM = () => {
    const newBom: BOMItem[] = components.map((c) => ({
      item: c.name,
      material: c.material,
      quantity: c.quantity,
      dimensions: c.dimensions,
      notes: "",
    }));
    setBom(newBom);
    setCurrentStep("bom");
  };

  const generateCutList = () => {
    const newCutList: CutListItem[] = components.map((c, i) => ({
      piece: c.name,
      material: c.material,
      length: 48,
      width: 30,
      thickness: 1,
      quantity: c.quantity,
      kerfAdjust: i > 0 ? kerfWidth : 0,
    }));
    setCutList(newCutList);
    setCurrentStep("cutlist");
  };

  const generateInstructions = () => {
    const newInstructions: Instruction[] = [
      {
        step: 1,
        description: "Cut all pieces to size according to the cut list",
        tips: skillLevel === "beginner" ? "Use a speed square to ensure accurate 90-degree cuts. Practice on scrap wood first." : "Ensure your saw is properly calibrated for accurate cuts.",
        timeEstimate: "45 min",
      },
      {
        step: 2,
        description: "Sand all pieces smooth, starting with 120 grit and finishing with 220 grit",
        tips: skillLevel === "beginner" ? "Sand with the grain to avoid scratches. Wear a dust mask." : "Use a random orbital sander for efficiency.",
        timeEstimate: "30 min",
      },
      {
        step: 3,
        description: "Assemble the frame by attaching aprons to legs",
        tips: skillLevel === "beginner" ? "Use wood glue and screws for strongest joint. Clamp while drying." : "Consider pocket hole joinery for clean appearance.",
        timeEstimate: "30 min",
      },
      {
        step: 4,
        description: "Attach table top to frame",
        tips: skillLevel === "beginner" ? "Use figure-8 fasteners to allow for wood movement. Pre-drill holes." : "Ensure counterbored holes for a flush fit.",
        timeEstimate: "20 min",
      },
      {
        step: 5,
        description: "Final sanding and apply finish",
        tips: skillLevel === "beginner" ? "Apply multiple thin coats of finish. Sand lightly between coats." : "Consider using a wood conditioner for even stain application.",
        timeEstimate: "1 hour",
      },
    ];
    setInstructions(newInstructions);
    setCurrentStep("instructions");
  };

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "upload", label: "Upload", icon: <Upload size={18} /> },
    { key: "analyze", label: "Analyze", icon: <Sparkles size={18} /> },
    { key: "bom", label: "BOM", icon: <FileText size={18} /> },
    { key: "cutlist", label: "Cut List", icon: <Scissors size={18} /> },
    { key: "instructions", label: "Steps", icon: <ListOrdered size={18} /> },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-button ${
                    index <= currentStepIndex
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.icon}
                  <span className="text-sm font-medium hidden sm:inline">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 mx-2 ${
                      index < currentStepIndex ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Upload */}
        {currentStep === "upload" && (
          <div className="bg-surface rounded-card shadow-card p-6 animate-fade-in">
            <h1 className="font-heading text-2xl font-bold text-gray-900 mb-6">
              Create New Project
            </h1>

            {/* Project Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Farmhouse Dining Table"
                className="w-full px-4 py-2 border border-gray-200 rounded-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photo or Sketch
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-card p-8 text-center hover:border-primary/50 transition-colors">
                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded project"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-2 right-2 bg-error text-white p-1 rounded-full"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drag and drop your image here, or click to browse
                    </p>
                    <p className="text-sm text-gray-400">
                      Supports JPG, PNG, WebP up to 10MB
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block mt-4 bg-primary text-white px-4 py-2 rounded-button cursor-pointer hover:bg-primary-dark transition-colors"
                    >
                      Choose File
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Level
                </label>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value as "beginner" | "intermediate")}
                  className="w-full px-4 py-2 border border-gray-200 rounded-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kerf Width (mm)
                </label>
                <select
                  value={kerfWidth}
                  onChange={(e) => setKerfWidth(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="1.5">Band Saw (1.5mm)</option>
                  <option value="3.0">Table Saw (3mm)</option>
                  <option value="6.0">Circular Saw (6mm)</option>
                </select>
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!projectName || !uploadedImage || isAnalyzing}
              className="w-full bg-accent hover:bg-accent-dark disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-button transition-colors flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Analyze with AI
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Analyze Results */}
        {currentStep === "analyze" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-surface rounded-card shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold text-gray-900">
                  Detected Components
                </h2>
                <button
                  onClick={generateBOM}
                  className="bg-accent hover:bg-accent-dark text-white font-medium px-4 py-2 rounded-button transition-colors"
                >
                  Generate BOM →
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {components.map((component, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {component.name}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          component.confidence >= 0.9
                            ? "bg-success/10 text-success"
                            : component.confidence >= 0.7
                            ? "bg-warning/10 text-warning"
                            : "bg-error/10 text-error"
                        }`}
                      >
                        {Math.round(component.confidence * 100)}% confidence
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Material: {component.material}</p>
                      <p>Dimensions: {component.dimensions}</p>
                      <p>Quantity: {component.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Preview */}
            {uploadedImage && (
              <div className="bg-surface rounded-card shadow-card p-6">
                <h3 className="font-heading font-semibold text-gray-900 mb-4">
                  Your Project Image
                </h3>
                <img
                  src={uploadedImage}
                  alt="Project"
                  className="max-h-48 rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        {/* Step 3: BOM */}
        {currentStep === "bom" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-surface rounded-card shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold text-gray-900">
                  Bill of Materials
                </h2>
                <button
                  onClick={generateCutList}
                  className="bg-accent hover:bg-accent-dark text-white font-medium px-4 py-2 rounded-button transition-colors"
                >
                  Generate Cut List →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Item
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Material
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Qty
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Dimensions
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bom.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4">{item.item}</td>
                        <td className="py-3 px-4">{item.material}</td>
                        <td className="py-3 px-4">{item.quantity}</td>
                        <td className="py-3 px-4 mono text-sm">
                          {item.dimensions}
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            placeholder="Add notes..."
                            className="w-full px-2 py-1 border border-gray-200 rounded-input text-sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Cut List */}
        {currentStep === "cutlist" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-surface rounded-card shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading text-xl font-bold text-gray-900">
                    Cut List
                  </h2>
                  <p className="text-sm text-gray-500">
                    Kerf-adjusted calculations ({kerfWidth}mm blade width)
                  </p>
                </div>
                <button
                  onClick={generateInstructions}
                  className="bg-accent hover:bg-accent-dark text-white font-medium px-4 py-2 rounded-button transition-colors"
                >
                  Generate Steps →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Piece
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Material
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Length
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Width
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Thickness
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Qty
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Kerf Adj
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cutList.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">{item.piece}</td>
                        <td className="py-3 px-4">{item.material}</td>
                        <td className="py-3 px-4 mono">{item.length}"</td>
                        <td className="py-3 px-4 mono">{item.width}"</td>
                        <td className="py-3 px-4 mono">{item.thickness}"</td>
                        <td className="py-3 px-4">{item.quantity}</td>
                        <td className="py-3 px-4 mono text-success">
                          +{item.kerfAdjust}mm
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Material Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total Board Feet:</span>
                    <p className="font-semibold">24.5 bf</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Kerf Waste:</span>
                    <p className="font-semibold text-warning">~0.5 bf</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Recommended Purchase:</span>
                    <p className="font-semibold">26 bf</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Instructions */}
        {currentStep === "instructions" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-surface rounded-card shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-gray-900">
                    Assembly Instructions
                  </h2>
                  <p className="text-sm text-gray-500">
                    Skill Level: {skillLevel === "beginner" ? "Beginner" : "Intermediate"}
                  </p>
                </div>
                <button className="bg-success hover:bg-green-600 text-white font-medium px-4 py-2 rounded-button flex items-center gap-2 transition-colors">
                  <Download size={18} />
                  Export PDF
                </button>
              </div>

              <div className="space-y-6">
                {instructions.map((instruction) => (
                  <div
                    key={instruction.step}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {instruction.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {instruction.description}
                        </h3>
                        <div className="bg-accent/10 p-3 rounded-lg mb-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">💡 Tip:</span>{" "}
                            {instruction.tips}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Estimated Time:</span>{" "}
                          {instruction.timeEstimate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Complete */}
            <div className="bg-success/10 border border-success/20 rounded-card p-6 text-center">
              <CheckCircle size={48} className="mx-auto text-success mb-4" />
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                Project Complete!
              </h3>
              <p className="text-gray-600 mb-4">
                Your woodworking project plan is ready. Export as PDF or save to your dashboard.
              </p>
              <div className="flex gap-3 justify-center">
                <button className="bg-success hover:bg-green-600 text-white font-medium px-4 py-2 rounded-button flex items-center gap-2">
                  <Download size={18} />
                  Export PDF
                </button>
                <Link
                  href="/dashboard"
                  className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-button"
                >
                  Save Project
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
