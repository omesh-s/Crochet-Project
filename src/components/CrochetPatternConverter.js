import React, { useState } from 'react';
import { RefreshCcw, CheckCircle, AlertTriangle } from 'lucide-react';
import Logo from '../assets/logo.svg';

const CrochetPatternConverter = () => {
  // ... (existing code remains the same)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFD700]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <img src={Logo} alt="Crochet Logo" className="h-12 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Crochet Pattern Converter</h1>
        </div>

        <div className="mb-8">
          <label htmlFor="file-upload" className="block text-gray-700 font-bold mb-2">
            Upload Crochet Pattern
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".txt,.pdf,.crochet"
            onChange={handleFileUpload}
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-8">
          <button
            onClick={handleConversion}
            disabled={!selectedFile || conversionStatus === 'converting'}
            className={`w-full py-4 rounded-lg text-white font-semibold transition flex items-center justify-center ${
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
          <span
            className={`mt-2 block text-center ${
              conversionStatus === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
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
              className="mt-3 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Download Converted Pattern
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrochetPatternConverter;