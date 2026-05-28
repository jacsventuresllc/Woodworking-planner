"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  CheckCircle,
  Save
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [projectName, setProjectName] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [skillLevel, setSkillLevel] = useState<"beginner" | "intermediate">("beginner");
  const [kerfWidth, setKerfWidth] = useState(3.0);

  // Demo data (will be replaced with AI response)
  const [components, setComponents] = useState<Component[]>([]);
  const [bom, setBom] = useState<BOMItem[]>([]);
  const [cutList, setCutList] = useState<CutListItem[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

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
    const newCutList: CutListItem[] = [
      { piece: "Table Top", material: "Hardwood", length: 48, width: 30, thickness: 1, quantity: 1, kerfAdjust: 3 },
      { piece: "Legs", material: "Hardwood", length: 28, width: 2, thickness: 2, quantity: 4, kerfAdjust: 3 },
      { piece: "Apron Front/Back", material: "Hardwood", length: 44, width: 4, thickness: 1, quantity: 2, kerfAdjust: 3 },
      { piece: "Apron Sides", material: "Hardwood", length: 26, width: 4, thickness: 1, quantity: 2, kerfAdjust: 3 },
    ];
    setCutList(newCutList);
    setCurrentStep("cutlist");
  };

  const generateInstructions = () => {
    const newInstructions: Instruction[] = [
      { step: 1, description: "Cut all lumber to rough dimensions", tips: "Cut pieces 1\" longer than final dimensions to allow for finishing", timeEstimate: "30 minutes" },
      { step: 2, description: "Mill lumber to final dimensions", tips: "Use a jointer and planer for flat, square edges", timeEstimate: "45 minutes" },
      { step: 3, description: "Cut joinery for legs and aprons", tips: "Use a dados or rabbets for strong joints", timeEstimate: "1 hour" },
      { step: 4, description: "Sand all pieces to 220 grit", tips: "Sand with grain, not against it", timeEstimate: "30 minutes" },
      { step: 5, description: "Assemble the base frame", tips: "Use wood glue and clamps", timeEstimate: "1 hour" },
      { step: 6, description: "Attach table top (float or固定)", tips: "Allow for seasonal wood movement", timeEstimate: "30 minutes" },
    ];
    setInstructions(newInstructions);
    setCurrentStep("instructions");
  };

  const handleSaveProject = async () => {
    if (!session?.user) return;
    
    setIsSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: projectName,
          imageUrl: uploadedImage,
          components,
          bom,
          cutList,
          instructions,
          skillLevel,
          kerfWidth,
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Failed to save project");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "upload", label: "Upload", icon: <Upload size={18} /> },
    { key: "analyze", label: "Analyze", icon: <Sparkles size={18} /> },
    { key: "bom", label: "BOM", icon: <FileText size={18} /> },
    { key: "cutlist", label: "Cut List", icon: <Scissors size={18} /> },
    { key: "instructions", label: "Instructions", icon: <ListOrdered size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            Create New Project
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <button
                onClick={() => {
                  const currentIndex = steps.findIndex(s => s.key === currentStep);
                  if (index <= currentIndex) setCurrentStep(step.key);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  steps.findIndex(s => s.key === currentStep) >= index
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {step.icon}
                {step.label}
              </button>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  steps.findIndex(s => s.key === currentStep) > index
                    ? "bg-primary"
                    : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Upload */}
        {currentStep === "upload" && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-surface rounded-card shadow-card p-6">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">
                Project Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., Farmhouse Dining Table"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Level
                  </label>
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value as "beginner" | "intermediate")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kerf Width (mm)
                  </label>
                  <input
                    type="number"
                    value={kerfWidth}
                    onChange={(e) => setKerfWidth(parseFloat(e.target.value))}
                    step="0.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Image or Sketch
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                    {uploadedImage ? (
                      <div className="relative">
                        <img src={uploadedImage} alt="Uploaded" className="max-h-64 mx-auto rounded-lg" />
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 mb-2">Click to upload an image of your project</p>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!projectName || !uploadedImage || isAnalyzing}
                className="w-full mt-6 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-medium px-4 py-3 rounded-button flex items-center justify-center gap-2 transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Analyze Project
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Analysis Results */}
        {currentStep === "analyze" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-surface rounded-card shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-gray-900">
                    Detected Components
                  </h2>
                  <p className="text-sm text-gray-500">
                    AI detected {components.length} components from your image
                  </p>
                </div>
                <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                  Analysis Complete
                </span>
              </div>

              <div className="grid gap-4">
                {components.map((comp, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{comp.name}</h3>
                      <p className="text-sm text-gray-500">
                        {comp.material} • {comp.dimensions}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Qty: {comp.quantity}</p>
                      <p className="text-xs text-gray-500">
                        {Math.round(comp.confidence * 100)}% confidence
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={generateBOM}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium px-4 py-3 rounded-button flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText size={18} />
                  Generate BOM
                </button>
                <button
                  onClick={() => setCurrentStep("upload")}
                  className="px-6 py-3 border border-gray-300 rounded-button text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: BOM */}
        {currentStep === "bom" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-surface rounded-card shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-gray-900">
                    Bill of Materials
                  </h2>
                  <p className="text-sm text-gray-500">
                    Materials needed for your project
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Item</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Material</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Qty</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Dimensions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bom.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">{item.item}</td>
                        <td className="py-3 px-4">{item.material}</td>
                        <td className="py-3 px-4">{item.quantity}</td>
                        <td className="py-3 px-4 mono">{item.dimensions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={generateCutList}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium px-4 py-3 rounded-button flex items-center justify-center gap-2 transition-colors"
                >
                  <Scissors size={18} />
                  Generate Cut List
                </button>
                <button
                  onClick={() => setCurrentStep("analyze")}
                  className="px-6 py-3 border border-gray-300 rounded-button text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Cut List */}
        {currentStep === "cutlist" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-surface rounded-card shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-gray-900">
                    Cut List
                  </h2>
                  <p className="text-sm text-gray-500">
                    Individual pieces to cut (kerf-adjusted)
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Piece</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Material</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Length</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Width</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Thick</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Qty</th>
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

              <div className="flex gap-3 mt-6">
                <button
                  onClick={generateInstructions}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium px-4 py-3 rounded-button flex items-center justify-center gap-2 transition-colors"
                >
                  <ListOrdered size={18} />
                  Generate Instructions
                </button>
                <button
                  onClick={() => setCurrentStep("bom")}
                  className="px-6 py-3 border border-gray-300 rounded-button text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
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
                Your woodworking project plan is ready. Save it to your dashboard.
              </p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={handleSaveProject}
                  disabled={isSaving}
                  className="bg-success hover:bg-green-600 disabled:bg-gray-300 text-white font-medium px-4 py-2 rounded-button flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Project
                    </>
                  )}
                </button>
                <Link
                  href="/dashboard"
                  className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-button"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
