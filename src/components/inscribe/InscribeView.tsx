import React, { useState, useRef } from 'react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

interface Inscription {
  id: string;
  name: string;
  type: string;
  size: string;
  inscriptionId: string;
  timestamp: Date;
}

interface InscribeViewProps {
  onInscriptionCreate: React.Dispatch<React.SetStateAction<Inscription[]>>;
}

const InscribeView: React.FC<InscribeViewProps> = ({ onInscriptionCreate }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const [isDragOver, setIsDragOver] = useState(false);
  const [isInscribing, setIsInscribing] = useState(false);
  const [inscriptionProgress, setInscriptionProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [inscriptionResult, setInscriptionResult] = useState<{
    txHash: string;
    inscriptionId: string;
  } | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [inscriptionName, setInscriptionName] = useState('');
  const [inscriptionDescription, setInscriptionDescription] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileType(file.name),
        progress: 0,
        status: 'uploading',
      };

      setUploadedFiles((prev) => [...prev, newFile]);

      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === fileId
              ? { ...file, progress: 100, status: 'completed' }
              : file
          )
        );
      } else {
        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === fileId ? { ...file, progress } : file
          )
        );
      }
    }, 200);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'PDF';
      case 'aac':
      case 'mp3':
      case 'wav':
        return 'AAC';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'IMG';
      case 'mp4':
      case 'avi':
      case 'mov':
        return 'VID';
      case 'txt':
      case 'doc':
      case 'docx':
        return 'TXT';
      default:
        return 'FILE';
    }
  };

  const getFileTypeColor = (type: string): string => {
    switch (type) {
      case 'PDF':
        return '#40F8AB';
      case 'AAC':
        return '#40F8AB';
      case 'IMG':
        return '#40F8AB';
      case 'VID':
        return '#40F8AB';
      case 'TXT':
        return '#40F8AB';
      default:
        return '#40F8AB';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleInscribe = async () => {
    if (uploadedFiles.length === 0 || isInscribing) return;

    setIsInscribing(true);
    setInscriptionProgress(0);

    try {
      const steps = [
        'Preparing files...',
        'Creating transaction...',
        'Writing to blockchain...',
        'Finalizing...',
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 750));
        setInscriptionProgress(((i + 1) / steps.length) * 100);
      }

      const txHash = '0x' + Math.random().toString(16).substring(2, 66);
      const inscriptionId = 'i' + Math.random().toString(36).substring(2, 15);

      setInscriptionResult({
        txHash,
        inscriptionId,
      });

      const newInscription: Inscription = {
        id: Date.now().toString(),
        name: inscriptionName || uploadedFiles[0]?.name || 'Unknown',
        type: uploadedFiles[0]?.type.toLowerCase() || 'file',
        size: uploadedFiles.length > 0 ? uploadedFiles[0].size : '0 Bytes',
        inscriptionId,
        timestamp: new Date(),
      };

      onInscriptionCreate((prev) => [newInscription, ...prev]);

      setShowSuccessModal(true);

      setTimeout(() => {
        setUploadedFiles([]);
        setInscriptionProgress(0);
        setInscriptionName('');
        setInscriptionDescription('');
        setShowAdvancedOptions(false);
      }, 2000);
    } catch (error) {
      console.error('Inscription failed:', error);
    } finally {
      setIsInscribing(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setInscriptionResult(null);
  };

  return (
    <div className="w-full border-l min-w-[696px] border-r border-hushr-gray overflow-y-auto hide-scrollbar">
      <div className="flex flex-col justify-center items-center px-8 gap-16 min-h-screen">
        <div className="w-full h-0"></div>

        <div className="flex flex-col items-center gap-8 w-full max-w-[632px]">
          <div className="flex flex-col items-center gap-4 w-[277px]">
            <h1 className="text-white font-quicksand font-semibold text-2xl leading-[30px] text-center">
              Upload your files
            </h1>
            <p className="text-white/50 font-quicksand font-medium text-base leading-5 text-center">
              Here we can describe our limitations, including formats and file
              size.
            </p>
          </div>

          <div
            className={`flex flex-col justify-center items-center px-0 py-16 gap-8 w-full border border-dashed rounded-2xl transition-colors ${
              isDragOver
                ? 'border-hushr-green bg-hushr-green/5'
                : 'border-white'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16">
              <img src="/inscribe/dragAndDrop.svg" alt="Drag & Drop" />
            </div>

            <div className="flex flex-col items-center gap-4 w-[354px]">
              <p className="text-hushr-grayLess font-quicksand font-semibold text-xl leading-[25px]">
                Drag & Drop your content to Inscribe
              </p>
              <p className="text-hushr-grayLess font-quicksand font-medium text-base leading-6">
                or
              </p>
              <button
                onClick={triggerFileSelect}
                className="flex justify-center items-center px-8 py-4 gap-2 border border-hushr-green rounded-2xl hover:bg-hushr-green/10 transition-colors"
              >
                <span className="text-hushr-green font-quicksand font-semibold text-base leading-6">
                  Browse files
                </span>
              </button>
            </div>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="flex flex-col justify-center items-start gap-8 w-full max-w-[632px]">
            <div className="flex flex-col justify-center items-start gap-4 w-[108px]">
              <h3 className="text-hushr-grayLess font-quicksand font-medium text-base leading-6">
                Uploaded files
              </h3>
            </div>

            <div className="flex flex-col gap-8 w-full">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-end gap-8 w-full">
                  <div className="flex items-center justify-center gap-2 w-14 h-14 border border-hushr-grayLess rounded-[10px]">
                    <div className="flex flex-col justify-end items-center gap-2 w-12 h-12 bg-white/10 rounded-lg">
                      <div
                        className="flex justify-center items-center px-0 py-1 gap-2 w-12 h-7 rounded-[8px]"
                        style={{
                          backgroundColor: getFileTypeColor(file.type),
                        }}
                      >
                        <span className="text-black font-quicksand font-semibold text-base leading-5 text-center">
                          {file.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-start gap-2 flex-1 h-16">
                    <div className="flex flex-col items-start">
                      <h4 className="text-white font-quicksand font-semibold text-base leading-5">
                        {file.name}
                      </h4>
                      <p className="text-hushr-grayLess font-quicksand font-medium text-base leading-6">
                        {file.size}
                      </p>
                    </div>

                    <div className="relative w-full h-2 bg-white/10 rounded-lg overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-hushr-green rounded-lg transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    {file.status === 'completed' ? (
                      <div className="w-8 h-8 border border-hushr-green rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M13.3334 4L6.00008 11.3333L2.66675 8"
                            stroke="#40F8AB"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : file.status === 'uploading' ? (
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <svg
                          className="animate-spin"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="6"
                            stroke="white"
                            strokeOpacity="0.5"
                            strokeWidth="2"
                          />
                          <path
                            d="M14 8C14 4.68629 11.3137 2 8 2"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    ) : (
                      <button
                        onClick={() => removeFile(file.id)}
                        className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center hover:bg-red-500/30 transition-colors"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M12 4L4 12M4 4L12 12"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="flex flex-col justify-center items-start gap-8 w-full max-w-[632px]">
            <div className="flex justify-between items-center w-full">
              <p className="text-hushr-grayLess font-quicksand font-medium text-base leading-6">
                Low fee: ~$45.9, within hours to days delivery
              </p>
              <button
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="flex justify-center items-center px-8 py-2 gap-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <span className="text-white/50 font-quicksand font-medium text-base leading-5 text-center">
                  Advanced options
                </span>
                <svg
                  className={`w-4 h-4 text-white/50 transition-transform duration-300 ease-in-out ${
                    showAdvancedOptions ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out w-full ${
                showAdvancedOptions
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex flex-col gap-4 w-full p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-white font-quicksand font-semibold text-lg leading-6">
                  Advanced Options
                </h3>

                <div className="flex flex-col gap-2">
                  <label className="text-white/70 font-quicksand font-medium text-sm leading-5">
                    Inscription Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={inscriptionName}
                    onChange={(e) => setInscriptionName(e.target.value)}
                    placeholder="Enter custom name for your inscription"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-quicksand font-medium text-base leading-6 placeholder:text-white/30 focus:outline-none focus:border-hushr-green/50 hover:bg-white/20 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/70 font-quicksand font-medium text-sm leading-5">
                    Description (Optional)
                  </label>
                  <textarea
                    value={inscriptionDescription}
                    onChange={(e) => setInscriptionDescription(e.target.value)}
                    placeholder="Add a description for your inscription"
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-quicksand font-medium text-base leading-6 placeholder:text-white/30 focus:outline-none focus:border-hushr-green/50 hover:bg-white/20 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleInscribe}
              className="relative flex justify-center items-center px-8 py-4 gap-2 w-full bg-hushr-green rounded-2xl hover:bg-hushr-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              disabled={uploadedFiles.length === 0 || isInscribing}
            >
              {isInscribing && (
                <div className="absolute inset-0 bg-black/20 rounded-2xl">
                  <div
                    className="h-full bg-hushr-green/30 rounded-2xl transition-all duration-300"
                    style={{ width: `${inscriptionProgress}%` }}
                  />
                </div>
              )}

              <div className="relative z-10 flex items-center gap-2">
                {isInscribing ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeOpacity="0.3"
                        strokeWidth="2"
                      />
                      <path
                        d="M22 12C22 6.48 17.52 2 12 2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-black font-quicksand font-semibold text-base leading-6">
                      Creating inscription... {Math.round(inscriptionProgress)}%
                    </span>
                  </>
                ) : (
                  <span className="text-black font-quicksand font-semibold text-base leading-6">
                    Inscribe
                  </span>
                )}
              </div>
            </button>
          </div>
        )}

        <div className="w-full h-0"></div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
        accept="*/*"
      />

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-black border border-hushr-green rounded-2xl p-8 max-w-md w-full mx-4 animate-scaleIn">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-hushr-green rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M26.6667 8L12.0001 22.6667L5.33344 16"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="text-center">
                <h3 className="text-white font-quicksand font-semibold text-xl leading-6 mb-2">
                  Inscription Created Successfully!
                </h3>
                <p className="text-white/70 font-quicksand font-medium text-base leading-5">
                  Your files have been successfully written to the blockchain
                </p>
              </div>

              {inscriptionResult && (
                <div className="w-full bg-black/30 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 font-quicksand font-medium text-sm">
                      Inscription ID:
                    </span>
                    <span className="text-hushr-green font-quicksand font-semibold text-sm">
                      {inscriptionResult.inscriptionId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 font-quicksand font-medium text-sm">
                      Transaction:
                    </span>
                    <span className="text-hushr-green font-quicksand font-semibold text-sm">
                      {inscriptionResult.txHash.slice(0, 8)}...
                      {inscriptionResult.txHash.slice(-6)}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={closeSuccessModal}
                className="flex justify-center items-center px-8 py-3 gap-2 w-full bg-hushr-green rounded-xl hover:bg-hushr-green/90 transition-colors"
              >
                <span className="text-black font-quicksand font-semibold text-base leading-6">
                  Close
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InscribeView;
