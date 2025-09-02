// import React, { useState, useEffect } from 'react';

// import { Send, Plus, Trash2, Clock, Eye, Copy, Download, History, Zap, Globe, Settings } from 'lucide-react';

// const API_URL = process.env.REACT_APP_API_URL;
// const PostmanClone = () => {
//   const [request, setRequest] = useState({
//     method: 'GET',
//     url: '',
//     headers: [{ key: '', value: '', enabled: true }],
//     body: '',
//     bodyType: 'raw'
//   });
  
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [showHistory, setShowHistory] = useState(false);
//   const [activeTab, setActiveTab] = useState('headers');
//   const [responseTab, setResponseTab] = useState('body');

//   const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
//   const bodyTypes = ['raw', 'form-data', 'urlencoded'];

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/history`);
//       const data = await res.json();
//       if (data.success) {
//         setHistory(data.history);
//       }
//     } catch (error) {
//       console.error('Error fetching history:', error);
//     }
//   };

//   const sendRequest = async () => {
//     if (!request.url.trim()) {
//       alert('Please enter a URL');
//       return;
//     }

//     setLoading(true);
//     setResponse(null);

//     try {
//       // Prepare headers object
//       const headers = {};
//       request.headers.forEach(header => {
//         if (header.key && header.value && header.enabled) {
//           headers[header.key] = header.value;
//         }
//       });

//       const requestData = {
//         method: request.method,
//         url: request.url,
//         headers,
//         body: request.body,
//         bodyType: request.bodyType
//       };

//       const res = await fetch(`${API_URL}/api/request`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData)
//       });

//       const data = await res.json();
//       setResponse(data.response);
//       fetchHistory(); // Refresh history
//     } catch (error) {
//       setResponse({
//         status: 0,
//         statusText: 'Network Error',
//         data: error.message,
//         time: 0,
//         headers: {}
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addHeader = () => {
//     setRequest(prev => ({
//       ...prev,
//       headers: [...prev.headers, { key: '', value: '', enabled: true }]
//     }));
//   };

//   const updateHeader = (index, field, value) => {
//     const updatedHeaders = [...request.headers];
//     updatedHeaders[index][field] = value;
//     setRequest(prev => ({ ...prev, headers: updatedHeaders }));
//   };

//   const removeHeader = (index) => {
//     const updatedHeaders = request.headers.filter((_, i) => i !== index);
//     setRequest(prev => ({ ...prev, headers: updatedHeaders }));
//   };

//   const loadFromHistory = (historyItem) => {
//     setRequest({
//       method: historyItem.method,
//       url: historyItem.url,
//       headers: Object.entries(historyItem.headers || {}).map(([key, value]) => ({
//         key, value, enabled: true
//       })).concat([{ key: '', value: '', enabled: true }]),
//       body: historyItem.body || '',
//       bodyType: historyItem.bodyType || 'raw'
//     });
//     setResponse(historyItem.response);
//     setShowHistory(false);
//   };

//   const copyResponse = () => {
//     if (response?.data) {
//       navigator.clipboard.writeText(response.data);
//       alert('Response copied to clipboard!');
//     }
//   };

//   const getStatusColor = (status) => {
//     if (status >= 200 && status < 300) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
//     if (status >= 300 && status < 400) return 'text-amber-600 bg-amber-50 border-amber-200';
//     if (status >= 400) return 'text-red-600 bg-red-50 border-red-200';
//     return 'text-slate-600 bg-slate-50 border-slate-200';
//   };

//   const getMethodColor = (method) => {
//     const colors = {
//       'GET': 'bg-emerald-500 text-white shadow-emerald-200',
//       'POST': 'bg-blue-500 text-white shadow-blue-200',
//       'PUT': 'bg-amber-500 text-white shadow-amber-200',
//       'PATCH': 'bg-purple-500 text-white shadow-purple-200',
//       'DELETE': 'bg-red-500 text-white shadow-red-200',
//       'HEAD': 'bg-slate-500 text-white shadow-slate-200',
//       'OPTIONS': 'bg-indigo-500 text-white shadow-indigo-200'
//     };
//     return colors[method] || 'bg-slate-500 text-white shadow-slate-200';
//   };

//   const formatTime = (time) => {
//     if (time < 1000) return `${time}ms`;
//     return `${(time / 1000).toFixed(2)}s`;
//   };

//   const formatJSON = (str) => {
//     try {
//       return JSON.stringify(JSON.parse(str), null, 2);
//     } catch {
//       return str;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
//       {/* Professional Header */}
//       <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
//         <div className="px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Zap className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                   API Studio Pro
//                 </h1>
//                 <p className="text-sm text-slate-500 font-medium">Professional API Testing Suite</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200">
//                 <Settings className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() => setShowHistory(!showHistory)}
//                 className={`flex items-center gap-2 px-4 py-2 font-medium rounded-xl transition-all duration-200 ${
//                   showHistory 
//                     ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
//                     : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//                 }`}
//               >
//                 <History className="w-4 h-4" />
//                 History
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex">
//         {/* Enhanced History Sidebar */}
//         {showHistory && (
//           <div className="w-96 bg-white/70 backdrop-blur-xl border-r border-slate-200/60 shadow-xl">
//             <div className="p-6 border-b border-slate-200/60">
//               <h3 className="font-bold text-lg text-slate-900 mb-2">Request History</h3>
//               <p className="text-sm text-slate-500">Recent API requests and responses</p>
//             </div>
//             <div className="p-4 max-h-screen overflow-y-auto">
//               <div className="space-y-3">
//                 {history.map((item) => (
//                   <div
//                     key={item._id}
//                     onClick={() => loadFromHistory(item)}
//                     className="group p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <span className={`px-3 py-1 text-xs font-bold rounded-lg shadow-sm ${getMethodColor(item.method)}`}>
//                         {item.method}
//                       </span>
//                       <span className={`px-2 py-1 text-xs font-semibold rounded-md border ${getStatusColor(item.response?.status)}`}>
//                         {item.response?.status}
//                       </span>
//                     </div>
//                     <div className="text-sm text-slate-700 font-medium truncate mb-2 group-hover:text-blue-700 transition-colors">
//                       {item.url}
//                     </div>
//                     <div className="flex items-center justify-between text-xs text-slate-400">
//                       <span>{new Date(item.createdAt).toLocaleDateString()}</span>
//                       <span>{new Date(item.createdAt).toLocaleTimeString()}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Enhanced Main Content */}
//         <div className="flex-1 p-8">
//           {/* Professional Request Builder */}
//           <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/60 p-8 mb-8">
//             <div className="flex items-center gap-3 mb-6">
//               <Globe className="w-6 h-6 text-blue-600" />
//               <h2 className="text-xl font-bold text-slate-900">API Request Builder</h2>
//             </div>
            
//             {/* Enhanced URL Bar */}
//             <div className="flex gap-4 mb-8">
//               <select
//                 value={request.method}
//                 onChange={(e) => setRequest(prev => ({ ...prev, method: e.target.value }))}
//                 className={`px-4 py-3 rounded-xl font-bold text-sm shadow-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${getMethodColor(request.method)}`}
//               >
//                 {methods.map(method => (
//                   <option key={method} value={method}>{method}</option>
//                 ))}
//               </select>
              
//               <input
//                 type="text"
//                 value={request.url}
//                 onChange={(e) => setRequest(prev => ({ ...prev, url: e.target.value }))}
//                 placeholder="https://api.example.com/endpoint"
//                 className="flex-1 px-6 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm font-medium text-slate-700 placeholder-slate-400 transition-all duration-200"
//               />
              
//               <button
//                 onClick={sendRequest}
//                 disabled={loading}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
//               >
//                 {loading ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <Send className="w-5 h-5" />
//                 )}
//                 <span>{loading ? 'Sending...' : 'Send Request'}</span>
//               </button>
//             </div>

//             {/* Enhanced Tabs */}
//             <div className="border-b border-slate-200 mb-6">
//               <div className="flex gap-8">
//                 <button
//                   onClick={() => setActiveTab('headers')}
//                   className={`pb-4 px-2 font-semibold transition-all duration-200 ${
//                     activeTab === 'headers' 
//                       ? 'text-blue-600 border-b-2 border-blue-600' 
//                       : 'text-slate-500 hover:text-slate-700'
//                   }`}
//                 >
//                   Headers
//                 </button>
//                 {['POST', 'PUT', 'PATCH'].includes(request.method) && (
//                   <button
//                     onClick={() => setActiveTab('body')}
//                     className={`pb-4 px-2 font-semibold transition-all duration-200 ${
//                       activeTab === 'body' 
//                         ? 'text-blue-600 border-b-2 border-blue-600' 
//                         : 'text-slate-500 hover:text-slate-700'
//                     }`}
//                   >
//                     Request Body
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Enhanced Headers Tab */}
//             {activeTab === 'headers' && (
//               <div className="space-y-4">
//                 {request.headers.map((header, index) => (
//                   <div key={index} className="flex gap-4 items-center p-4 bg-slate-50/50 rounded-xl border border-slate-200/50">
//                     <input
//                       type="checkbox"
//                       checked={header.enabled}
//                       onChange={(e) => updateHeader(index, 'enabled', e.target.checked)}
//                       className="w-5 h-5 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
//                     />
//                     <input
//                       type="text"
//                       value={header.key}
//                       onChange={(e) => updateHeader(index, 'key', e.target.value)}
//                       placeholder="Header key"
//                       className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
//                     />
//                     <input
//                       type="text"
//                       value={header.value}
//                       onChange={(e) => updateHeader(index, 'value', e.target.value)}
//                       placeholder="Header value"
//                       className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
//                     />
//                     <button
//                       onClick={() => removeHeader(index)}
//                       className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   onClick={addHeader}
//                   className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold py-2 px-4 hover:bg-blue-50 rounded-lg transition-all duration-200"
//                 >
//                   <Plus className="w-5 h-5" />
//                   Add Header
//                 </button>
//               </div>
//             )}

//             {/* Enhanced Body Tab */}
//             {activeTab === 'body' && ['POST', 'PUT', 'PATCH'].includes(request.method) && (
//               <div className="space-y-6">
//                 <div className="flex gap-6 p-4 bg-slate-50/50 rounded-xl">
//                   {bodyTypes.map(type => (
//                     <label key={type} className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="bodyType"
//                         value={type}
//                         checked={request.bodyType === type}
//                         onChange={(e) => setRequest(prev => ({ ...prev, bodyType: e.target.value }))}
//                         className="w-4 h-4 text-blue-600 bg-white border-slate-300 focus:ring-blue-500 focus:ring-2"
//                       />
//                       <span className="font-medium text-slate-700">{type}</span>
//                     </label>
//                   ))}
//                 </div>
                
//                 <textarea
//                   value={request.body}
//                   onChange={(e) => setRequest(prev => ({ ...prev, body: e.target.value }))}
//                   placeholder={
//                     request.bodyType === 'raw' 
//                       ? '{\n  "key": "value",\n  "data": "example"\n}' 
//                       : 'Enter request body content...'
//                   }
//                   rows={10}
//                   className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm resize-none"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Enhanced Response Section */}
//           {response && (
//             <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/60 p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <Eye className="w-6 h-6 text-emerald-600" />
//                   <h2 className="text-xl font-bold text-slate-900">API Response</h2>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg">
//                     <Clock className="w-4 h-4 text-slate-500" />
//                     <span className="text-sm font-semibold text-slate-600">{formatTime(response.time)}</span>
//                   </div>
//                   <div className={`px-4 py-2 rounded-lg font-bold text-sm border ${getStatusColor(response.status)}`}>
//                     {response.status} {response.statusText}
//                   </div>
//                   <button
//                     onClick={copyResponse}
//                     className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200"
//                   >
//                     <Copy className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Enhanced Response Tabs */}
//               <div className="border-b border-slate-200 mb-6">
//                 <div className="flex gap-8">
//                   <button
//                     onClick={() => setResponseTab('body')}
//                     className={`pb-4 px-2 font-semibold transition-all duration-200 ${
//                       responseTab === 'body' 
//                         ? 'text-emerald-600 border-b-2 border-emerald-600' 
//                         : 'text-slate-500 hover:text-slate-700'
//                     }`}
//                   >
//                     Response Body
//                   </button>
//                   <button
//                     onClick={() => setResponseTab('headers')}
//                     className={`pb-4 px-2 font-semibold transition-all duration-200 ${
//                       responseTab === 'headers' 
//                         ? 'text-emerald-600 border-b-2 border-emerald-600' 
//                         : 'text-slate-500 hover:text-slate-700'
//                     }`}
//                   >
//                     Response Headers
//                   </button>
//                 </div>
//               </div>

//               {/* Enhanced Response Body */}
//               {responseTab === 'body' && (
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-bold text-slate-700">Response Data</span>
//                     <button
//                       onClick={() => {
//                         const formatted = formatJSON(response.data);
//                         setResponse(prev => ({ ...prev, data: formatted }));
//                       }}
//                       className="text-sm font-semibold text-blue-600 hover:text-blue-700 px-3 py-1 hover:bg-blue-50 rounded-lg transition-all duration-200"
//                     >
//                       Format JSON
//                     </button>
//                   </div>
//                   <div className="bg-slate-900 rounded-xl p-6 shadow-inner">
//                     <pre className="text-sm text-slate-300 overflow-auto max-h-96 leading-relaxed">
//                       {response.data}
//                     </pre>
//                   </div>
//                 </div>
//               )}

//               {/* Enhanced Response Headers */}
//               {responseTab === 'headers' && (
//                 <div className="space-y-4">
//                   <span className="text-sm font-bold text-slate-700">Response Headers</span>
//                   <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
//                     <div className="space-y-3">
//                       {Object.entries(response.headers || {}).map(([key, value]) => (
//                         <div key={key} className="flex py-2 border-b border-slate-200 last:border-b-0">
//                           <span className="font-bold text-slate-700 w-48 flex-shrink-0">{key}:</span>
//                           <span className="text-slate-600 font-medium break-all">{value}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostmanClone;


import React, { useState, useEffect } from 'react';
import { Send, Plus, Trash2, Clock, Eye, Copy, Download, History, Zap, Globe, Settings } from 'lucide-react';

// Use the deployed backend URL directly
const API_URL = 'https://apitool-backend-1.onrender.com';

const PostmanClone = () => {
  const [request, setRequest] = useState({
    method: 'GET',
    url: '',
    headers: [{ key: '', value: '', enabled: true }],
    body: '',
    bodyType: 'raw'
  });
  
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('headers');
  const [responseTab, setResponseTab] = useState('body');

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
  const bodyTypes = ['raw', 'form-data', 'urlencoded'];

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/history`);
      const data = await res.json();
      if (data.success) {
        setHistory(data.history);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const sendRequest = async () => {
    if (!request.url.trim()) {
      alert('Please enter a URL');
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      // Prepare headers object
      const headers = {};
      request.headers.forEach(header => {
        if (header.key && header.value && header.enabled) {
          headers[header.key] = header.value;
        }
      });

      const requestData = {
        method: request.method,
        url: request.url,
        headers,
        body: request.body,
        bodyType: request.bodyType
      };

      const res = await fetch(`${API_URL}/api/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const data = await res.json();
      setResponse(data.response);
      fetchHistory(); // Refresh history
    } catch (error) {
      setResponse({
        status: 0,
        statusText: 'Network Error',
        data: error.message,
        time: 0,
        headers: {}
      });
    } finally {
      setLoading(false);
    }
  };

  const addHeader = () => {
    setRequest(prev => ({
      ...prev,
      headers: [...prev.headers, { key: '', value: '', enabled: true }]
    }));
  };

  const updateHeader = (index, field, value) => {
    const updatedHeaders = [...request.headers];
    updatedHeaders[index][field] = value;
    setRequest(prev => ({ ...prev, headers: updatedHeaders }));
  };

  const removeHeader = (index) => {
    const updatedHeaders = request.headers.filter((_, i) => i !== index);
    setRequest(prev => ({ ...prev, headers: updatedHeaders }));
  };

  const loadFromHistory = (historyItem) => {
    setRequest({
      method: historyItem.method,
      url: historyItem.url,
      headers: Object.entries(historyItem.headers || {}).map(([key, value]) => ({
        key, value, enabled: true
      })).concat([{ key: '', value: '', enabled: true }]),
      body: historyItem.body || '',
      bodyType: historyItem.bodyType || 'raw'
    });
    setResponse(historyItem.response);
    setShowHistory(false);
  };

  const copyResponse = () => {
    if (response?.data) {
      navigator.clipboard.writeText(response.data);
      alert('Response copied to clipboard!');
    }
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (status >= 300 && status < 400) return 'text-amber-600 bg-amber-50 border-amber-200';
    if (status >= 400) return 'text-red-600 bg-red-50 border-red-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
  };

  const getMethodColor = (method) => {
    const colors = {
      'GET': 'bg-emerald-500 text-white shadow-emerald-200',
      'POST': 'bg-blue-500 text-white shadow-blue-200',
      'PUT': 'bg-amber-500 text-white shadow-amber-200',
      'PATCH': 'bg-purple-500 text-white shadow-purple-200',
      'DELETE': 'bg-red-500 text-white shadow-red-200',
      'HEAD': 'bg-slate-500 text-white shadow-slate-200',
      'OPTIONS': 'bg-indigo-500 text-white shadow-indigo-200'
    };
    return colors[method] || 'bg-slate-500 text-white shadow-slate-200';
  };

  const formatTime = (time) => {
    if (time < 1000) return `${time}ms`;
    return `${(time / 1000).toFixed(2)}s`;
  };

  const formatJSON = (str) => {
    try {
      return JSON.stringify(JSON.parse(str), null, 2);
    } catch {
      return str;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Professional Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  API Studio Pro
                </h1>
                <p className="text-sm text-slate-500 font-medium">Professional API Testing Suite</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`flex items-center gap-2 px-4 py-2 font-medium rounded-xl transition-all duration-200 ${
                  showHistory 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <History className="w-4 h-4" />
                History
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Enhanced History Sidebar */}
        {showHistory && (
          <div className="w-96 bg-white/70 backdrop-blur-xl border-r border-slate-200/60 shadow-xl">
            <div className="p-6 border-b border-slate-200/60">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Request History</h3>
              <p className="text-sm text-slate-500">Recent API requests and responses</p>
            </div>
            <div className="p-4 max-h-screen overflow-y-auto">
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => loadFromHistory(item)}
                    className="group p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 text-xs font-bold rounded-lg shadow-sm ${getMethodColor(item.method)}`}>
                        {item.method}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-md border ${getStatusColor(item.response?.status)}`}>
                        {item.response?.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-700 font-medium truncate mb-2 group-hover:text-blue-700 transition-colors">
                      {item.url}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      <span>{new Date(item.createdAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Main Content */}
        <div className="flex-1 p-8">
          {/* Professional Request Builder */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/60 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">API Request Builder</h2>
            </div>
            
            {/* Enhanced URL Bar */}
            <div className="flex gap-4 mb-8">
              <select
                value={request.method}
                onChange={(e) => setRequest(prev => ({ ...prev, method: e.target.value }))}
                className={`px-4 py-3 rounded-xl font-bold text-sm shadow-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${getMethodColor(request.method)}`}
              >
                {methods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              
              <input
                type="text"
                value={request.url}
                onChange={(e) => setRequest(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://api.example.com/endpoint"
                className="flex-1 px-6 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm font-medium text-slate-700 placeholder-slate-400 transition-all duration-200"
              />
              
              <button
                onClick={sendRequest}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>{loading ? 'Sending...' : 'Send Request'}</span>
              </button>
            </div>

            {/* Enhanced Tabs */}
            <div className="border-b border-slate-200 mb-6">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('headers')}
                  className={`pb-4 px-2 font-semibold transition-all duration-200 ${
                    activeTab === 'headers' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Headers
                </button>
                {['POST', 'PUT', 'PATCH'].includes(request.method) && (
                  <button
                    onClick={() => setActiveTab('body')}
                    className={`pb-4 px-2 font-semibold transition-all duration-200 ${
                      activeTab === 'body' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Request Body
                  </button>
                )}
              </div>
            </div>

            {/* Enhanced Headers Tab */}
            {activeTab === 'headers' && (
              <div className="space-y-4">
                {request.headers.map((header, index) => (
                  <div key={index} className="flex gap-4 items-center p-4 bg-slate-50/50 rounded-xl border border-slate-200/50">
                    <input
                      type="checkbox"
                      checked={header.enabled}
                      onChange={(e) => updateHeader(index, 'enabled', e.target.checked)}
                      className="w-5 h-5 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <input
                      type="text"
                      value={header.key}
                      onChange={(e) => updateHeader(index, 'key', e.target.value)}
                      placeholder="Header key"
                      className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                    />
                    <input
                      type="text"
                      value={header.value}
                      onChange={(e) => updateHeader(index, 'value', e.target.value)}
                      placeholder="Header value"
                      className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                    />
                    <button
                      onClick={() => removeHeader(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addHeader}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold py-2 px-4 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  Add Header
                </button>
              </div>
            )}

            {/* Enhanced Body Tab */}
            {activeTab === 'body' && ['POST', 'PUT', 'PATCH'].includes(request.method) && (
              <div className="space-y-6">
                <div className="flex gap-6 p-4 bg-slate-50/50 rounded-xl">
                  {bodyTypes.map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="bodyType"
                        value={type}
                        checked={request.bodyType === type}
                        onChange={(e) => setRequest(prev => ({ ...prev, bodyType: e.target.value }))}
                        className="w-4 h-4 text-blue-600 bg-white border-slate-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="font-medium text-slate-700">{type}</span>
                    </label>
                  ))}
                </div>
                
                <textarea
                  value={request.body}
                  onChange={(e) => setRequest(prev => ({ ...prev, body: e.target.value }))}
                  placeholder={
                    request.bodyType === 'raw' 
                      ? '{\n  "key": "value",\n  "data": "example"\n}' 
                      : 'Enter request body content...'
                  }
                  rows={10}
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm resize-none"
                />
              </div>
            )}
          </div>

          {/* Enhanced Response Section */}
          {response && (
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/60 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-xl font-bold text-slate-900">API Response</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-semibold text-slate-600">{formatTime(response.time)}</span>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm border ${getStatusColor(response.status)}`}>
                    {response.status} {response.statusText}
                  </div>
                  <button
                    onClick={copyResponse}
                    className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Enhanced Response Tabs */}
              <div className="border-b border-slate-200 mb-6">
                <div className="flex gap-8">
                  <button
                    onClick={() => setResponseTab('body')}
                    className={`pb-4 px-2 font-semibold transition-all duration-200 ${
                      responseTab === 'body' 
                        ? 'text-emerald-600 border-b-2 border-emerald-600' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Response Body
                  </button>
                  <button
                    onClick={() => setResponseTab('headers')}
                    className={`pb-4 px-2 font-semibold transition-all duration-200 ${
                      responseTab === 'headers' 
                        ? 'text-emerald-600 border-b-2 border-emerald-600' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Response Headers
                  </button>
                </div>
              </div>

              {/* Enhanced Response Body */}
              {responseTab === 'body' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700">Response Data</span>
                    <button
                      onClick={() => {
                        const formatted = formatJSON(response.data);
                        setResponse(prev => ({ ...prev, data: formatted }));
                      }}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700 px-3 py-1 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                      Format JSON
                    </button>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-6 shadow-inner">
                    <pre className="text-sm text-slate-300 overflow-auto max-h-96 leading-relaxed">
                      {response.data}
                    </pre>
                  </div>
                </div>
              )}

              {/* Enhanced Response Headers */}
              {responseTab === 'headers' && (
                <div className="space-y-4">
                  <span className="text-sm font-bold text-slate-700">Response Headers</span>
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="space-y-3">
                      {Object.entries(response.headers || {}).map(([key, value]) => (
                        <div key={key} className="flex py-2 border-b border-slate-200 last:border-b-0">
                          <span className="font-bold text-slate-700 w-48 flex-shrink-0">{key}:</span>
                          <span className="text-slate-600 font-medium break-all">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostmanClone;