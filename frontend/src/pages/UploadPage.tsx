import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  Database,
  CheckCircle,
  Loader2,
  Brain,
  Sparkles,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

// backend hook
import { useAnalyze } from '@/hooks/useAnalyze';
import { mockReturns } from '@/data/mockData';

type UploadMethod = 'csv' | 'paste' | 'demo';
type UploadState = 'idle' | 'uploading' | 'processing' | 'complete';

export default function UploadPage() {
  const navigate = useNavigate();
  const { setIsDataLoaded, setIsProcessing } = useApp();
  const { analyzeReturns } = useAnalyze();

  const [method, setMethod] = useState<UploadMethod | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [pasteText, setPasteText] = useState('');
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processingSteps = [
    'Parsing return data...',
    'Extracting customer feedback...',
    'Running NLP analysis...',
    'Identifying patterns...',
    'Generating root causes...',
    'Computing confidence scores...',
    'Finalizing insights...',
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const simulateProcessing = useCallback(() => {
    setUploadState('processing');
    setIsProcessing(true);
    setProgress(0);
    setCurrentStep(0);

    const duration = 4000;
    const interval = duration / 100;
    const stepInterval = duration / processingSteps.length;

    let currentProgress = 0;
    const progressTimer = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 100) clearInterval(progressTimer);
    }, interval);

    let step = 0;
    const stepTimer = setInterval(() => {
      step += 1;
      setCurrentStep(step);
      if (step >= processingSteps.length) clearInterval(stepTimer);
    }, stepInterval);

    setTimeout(() => {
      setUploadState('complete');
      setIsProcessing(false);
      setIsDataLoaded(true);
    }, duration);
  }, [setIsDataLoaded, setIsProcessing]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      setUploadState('uploading');
      setTimeout(simulateProcessing, 800);
    }
  }, [simulateProcessing]);

  const handleFileSelect = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setUploadState('uploading');
      setTimeout(simulateProcessing, 800);
    }
  };

  const handleDemoMode = async () => {
    setMethod('demo');

    // start UI immediately
    simulateProcessing();

    // backend call in parallel (non-blocking)
    analyzeReturns(mockReturns).catch((err) => {
      console.error('Backend analysis failed:', err);
    });
  };

  const handlePasteSubmit = () => {
    if (!pasteText.trim()) return;
    simulateProcessing();
  };

  if (uploadState === 'processing' || uploadState === 'complete') {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-12 max-w-lg w-full text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-purple/5" />

          <AnimatePresence mode="wait">
            {uploadState === 'processing' ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-accent-purple animate-pulse opacity-30" />
                  <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
                    <Brain className="w-10 h-10 text-accent animate-pulse" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-2">
                  AI Analyzing Your Data
                </h2>
                <p className="text-muted-foreground mb-8">
                  Finding patterns and root causes...
                </p>

                <div className="mb-6">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-accent-purple"
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: 'linear' }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>{processingSteps[currentStep] || 'Initializing...'}</span>
                    <span>{progress}%</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Analysis Complete!
                </h2>
                <p className="text-muted-foreground mb-8">
                  Discovered <span className="text-accent font-semibold">5 root causes</span> across your return data
                </p>
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-accent to-accent-purple"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  View Insights
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-3">Data Ingestion</h1>
        <p className="text-muted-foreground text-lg">
          Upload your return data and let AI discover root causes
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { id: 'csv', icon: Upload, title: 'Upload CSV', desc: 'Import returns data file' },
          { id: 'paste', icon: FileText, title: 'Paste Text', desc: 'Customer feedback or logs' },
          { id: 'demo', icon: Database, title: 'Demo Mode', desc: 'Try with sample data' },
        ].map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => item.id === 'demo' ? handleDemoMode() : setMethod(item.id as UploadMethod)}
            className={cn("glass-card-hover rounded-2xl p-8 text-center", method === item.id && "neon-border-cyan")}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-accent/20 to-accent-purple/10 flex items-center justify-center">
              <item.icon className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {method === 'csv' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-2xl p-16 text-center",
                dragOver ? "border-accent bg-accent/5" : "border-border"
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <Button onClick={handleFileSelect} variant="outline">Browse Files</Button>
            </div>
          </motion.div>
        )}

        {method === 'paste' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="glass-card rounded-2xl p-6">
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                className="w-full h-48 bg-secondary/50 border rounded-xl p-4"
              />
              <div className="flex justify-end mt-4">
                <Button onClick={handlePasteSubmit}>
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze with AI
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
