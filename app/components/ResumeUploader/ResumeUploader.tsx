// components/ResumeUploader/ResumeUploader.tsx
'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface ResumeUploaderProps {
  onFileUploaded: (file: File) => void;
}

export default function ResumeUploader({ onFileUploaded }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Reset states
    setError('');
    setSuccess('');

    // Validate file type
    const validTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(fileExt || '')) {
      setError(`Unsupported file type. Please upload: ${validTypes.join(', ')}`);
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return;
    }

    setFile(file);
    setUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('✅ Resume uploaded successfully!');
      onFileUploaded(file);
    } catch (err) {
      setError('Failed to process file');
    } finally {
      setUploading(false);
    }
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: (rejectedFiles) => {
      const error = rejectedFiles[0]?.errors[0];
      if (error?.code === 'file-too-large') {
        setError('File is too large (max 10MB)');
      } else if (error?.code === 'file-invalid-type') {
        setError('Invalid file type. Please upload PDF, DOC, DOCX, or TXT files.');
      } else {
        setError('Failed to upload file');
      }
    }
  });

  const removeFile = () => {
    setFile(null);
    setError('');
    setSuccess('');
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Resume</h3>
        <p className="text-sm text-gray-600">
          Upload your resume (PDF, DOC, DOCX, TXT) to apply for this position.
        </p>
      </div>

      {/* Upload Area */}
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-blue-500 bg-blue-50 scale-[1.02]'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-gray-700 font-medium mb-2">
            {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse
          </p>
          <div className="text-xs text-gray-400">
            Supported formats: PDF, DOC, DOCX, TXT • Max size: 10MB
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{file.name}</div>
                <div className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                </div>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              disabled={uploading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Uploading State */}
          {uploading && (
            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Loader className="w-4 h-4 animate-spin" />
                <span>Processing resume...</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Error</span>
              </div>
              <p className="text-sm text-red-600 mt-1">{error}</p>
              <button
                onClick={removeFile}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Try another file
              </button>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Success!</span>
              </div>
              <p className="text-sm text-green-600 mt-1">{success}</p>
              <p className="text-xs text-green-700 mt-2">
                Please fill the application form below.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}