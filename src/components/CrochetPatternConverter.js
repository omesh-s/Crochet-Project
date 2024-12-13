import React, { useState } from 'react';
import { RefreshCcw, CheckCircle, AlertTriangle } from 'lucide-react';

const CrochetPatternConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [conversionStatus, setConversionStatus] = useState(null);
  const [convertedText, setConvertedText] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setConversionStatus(null);
      setConvertedText('');
    }
  };

  const handleConversion = async () => {
    if (!selectedFile) {
      setConversionStatus('error');
      return;
    }

    try {
      setConversionStatus('converting');
      // Call your friend's AI model API to convert the file
      const response = await fetch('/convert', {
        method: 'POST',
        body: selectedFile,
      });
      const convertedText = await response.text();
      setConvertedText(convertedText);
      setConversionStatus('success');
    } catch (error) {
      setConversionStatus('error');
    }
  };

  const handleDownload = () => {
    if (convertedText) {
      const blob = new Blob([convertedText], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'converted_crochet_pattern.txt';
      link.click();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Crochet Pattern Converter</h1>

        <div className="mb-6">
            <label htmlFor="file-upload" className="block text-gray-700 font-bold mb-2">
            Upload Crochet Pattern
            </label>
            <input
            id="file-upload"
            type="file"
            accept=".txt,.pdf,.crochet"
            onChange={handleFileUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>

        <div className="mb-6">
            <button
            onClick={handleConversion}
            disabled={!selectedFile || conversionStatus === 'converting'}
            className={`w-full py-3 rounded-lg text-white font-semibold transition flex items-center justify-center ${
                !selectedFile
                ? 'bg-gray-400 cursor-not-allowed'
                : conversionStatus === 'converting'
                ? 'bg-blue-600 opacity-50'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
            >
            {conversionStatus === 'converting' ? (
                <>
                <RefreshCcw className="mr-2 animate-spin" />
                Converting...
                </>
            ) : (
                'Convert'
            )}
            </button>
            <span className={`ml-4 ${conversionStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {conversionStatus === 'success'
                ? 'Conversion Successful!'
                : conversionStatus === 'error'
                ? 'Conversion Failed. Please try again.'
                : ''}
            </span>
        </div>

        {conversionStatus === 'success' && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="bg-white border rounded p-3 max-h-40 overflow-y-auto">
                <pre className="text-sm text-gray-700">{convertedText}</pre>
            </div>
            <button
                onClick={handleDownload}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
                Download Converted Pattern
            </button>
            </div>
      )}
      
    </div>
  );
};

export default CrochetPatternConverter;