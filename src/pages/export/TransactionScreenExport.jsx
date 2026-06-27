// TransactionScreenExport.jsx
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import transactionService from "../../services/TransactionServices";

const TransactionExportScreen = ({ 
    isOpen, 
    onClose, 
    filters = {}, 
    totalRecords = 0 
}) => {
    const [loading, setLoading] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [status, setStatus] = useState('idle');

    // ─── Export Function ────────────────────────────────────────────────
    const generatePDF = async () => {
        setLoading(true);
        setStatus('fetching');
        setExportProgress(0);
        
        try {
            const params = {
                page: 1,
                limit: 1000
            };
            
            if (filters.search) params.search = filters.search;
            if (filters.status) params.status = filters.status;
            if (filters.merchant_id) params.merchant_id = filters.merchant_id;
            if (filters.api_used) params.api_used = filters.api_used;
            if (filters.from_date) params.from_date = filters.from_date;
            if (filters.to_date) params.to_date = filters.to_date;
            
            const response = await transactionService.getTransactions(params);
            const transactions = response.data || [];
            const stats = response.stats || {};
            
            setExportProgress(40);
            setStatus('generating');
            
            if (transactions.length === 0) {
                alert('No transactions to export');
                setLoading(false);
                setStatus('idle');
                return;
            }

            // ─── Create PDF with proper margins ──────────────────────────
            const doc = new jsPDF('landscape', 'mm', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 14;
            
            // ─── Header Section ──────────────────────────────────────────
            // Company/Title
            doc.setFontSize(20);
            doc.setTextColor(30, 58, 138);
            doc.setFont('helvetica', 'bold');
            doc.text('Transactions Report', margin, 20);
            
            // Divider Line
            doc.setDrawColor(59, 130, 246);
            doc.setLineWidth(0.5);
            doc.line(margin, 24, pageWidth - margin, 24);
            
            // ─── Meta Information ────────────────────────────────────────
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            doc.setFont('helvetica', 'normal');
            
            let yPos = 30;
            const leftCol = margin;
            const rightCol = pageWidth - margin - 60;
            
            // Left column: Generated info
            doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, leftCol, yPos);
            yPos += 5;
            doc.text(`Total Records: ${transactions.length}`, leftCol, yPos);
            
            // Right column: Filters info
            let filterText = '';
            if (filters.from_date && filters.to_date) {
                filterText += `Date: ${filters.from_date} to ${filters.to_date}`;
            }
            if (filters.merchant_id) {
                filterText += filterText ? ' | ' : '';
                filterText += `Merchant: ${filters.merchant_id}`;
            }
            if (filters.api_used) {
                filterText += filterText ? ' | ' : '';
                filterText += `API: ${filters.api_used}`;
            }
            if (filters.status) {
                filterText += filterText ? ' | ' : '';
                filterText += `Status: ${filters.status}`;
            }
            if (!filterText) {
                filterText = 'All Transactions';
            }
            
            doc.text(`Filters: ${filterText}`, rightCol, 30);
            
            // ─── Summary Stats Box ──────────────────────────────────────
            yPos = 40;
            const statsBoxY = yPos;
            
            // Draw stats box background
            doc.setFillColor(241, 245, 249);
            doc.setDrawColor(203, 213, 225);
            doc.rect(margin, statsBoxY, pageWidth - (margin * 2), 16, 'FD');
            
            // Stats text with better formatting
            doc.setFontSize(9);
            doc.setTextColor(30, 30, 30);
            doc.setFont('helvetica', 'bold');
            
            const statsText = `Total: ${stats.all_count || 0}  │  Success: ${stats.success || 0}  │   Failed: ${stats.failed || 0}  │   Processing: ${stats.processing || 0}  │   Initiated: ${stats.initiated || 0}  │   Returned: ${stats.returned || 0}`;
            doc.text(statsText, margin + 3, statsBoxY + 10);
            
            setExportProgress(60);
            
            // ─── Table Data ─────────────────────────────────────────────
            const tableData = transactions.map((txn, index) => [
                index + 1,
                txn.trx_id || txn.id || 'N/A',
                txn.order_id || 'N/A',
                txn.merchant_name || 'N/A',
                txn.bene_name || 'N/A',
                txn.amount ? `Rs ${parseFloat(txn.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : 'Rs 0.00',
                txn.api_name || 'N/A',
                (txn.status || 'N/A').charAt(0).toUpperCase() + (txn.status || 'N/A').slice(1),
                txn.utr || 'N/A',
                txn.created_at ? new Date(txn.created_at).toLocaleDateString('en-IN') : 'N/A',
                txn.created_at ? new Date(txn.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'N/A'
            ]);

            // ─── Generate Table with proper styling ─────────────────────
            doc.autoTable({
                head: [[
                    '#', 'Txn ID', 'Order ID', 'Merchant', 'Beneficiary', 
                    'Amount', 'API Used', 'Status', 'UTR/Ref No.', 'Date', 'Time'
                ]],
                body: tableData,
                startY: statsBoxY + 22,
                margin: { left: margin, right: margin },
                styles: {
                    fontSize: 7,
                    cellPadding: 2.5,
                    overflow: 'linebreak',
                    font: 'helvetica',
                    valign: 'middle'
                },
                headStyles: {
                    fillColor: [30, 58, 138],
                    textColor: [255, 255, 255],
                    fontSize: 8,
                    fontStyle: 'bold',
                    halign: 'center',
                    valign: 'middle',
                    cellPadding: 3
                },
                columnStyles: {
                    0: { cellWidth: 10, halign: 'center' },
                    1: { cellWidth: 32, halign: 'center' },
                    2: { cellWidth: 28, halign: 'center' },
                    3: { cellWidth: 28, halign: 'center' },
                    4: { cellWidth: 32, halign: 'center' },
                    5: { cellWidth: 24, halign: 'right' },
                    6: { cellWidth: 26, halign: 'center' },
                    7: { cellWidth: 24, halign: 'center' },
                    8: { cellWidth: 28, halign: 'center' },
                    9: { cellWidth: 22, halign: 'center' },
                    10: { cellWidth: 18, halign: 'center' }
                },
                // Alternate row colors
                didDrawCell: function(data) {
                    // Add alternating row colors
                    if (data.section === 'body' && data.row.index % 2 === 0) {
                        data.cell.styles.fillColor = [248, 250, 252];
                    }
                },
                didParseCell: function(data) {
                    // Color status cells
                    if (data.section === 'body' && data.column.index === 7) {
                        const status = data.cell.raw?.toLowerCase() || '';
                        if (status === 'success') {
                            data.cell.styles.textColor = [16, 185, 129];
                            data.cell.styles.fontStyle = 'bold';
                            data.cell.styles.fillColor = [236, 253, 245];
                        } else if (status === 'failed') {
                            data.cell.styles.textColor = [239, 68, 68];
                            data.cell.styles.fontStyle = 'bold';
                            data.cell.styles.fillColor = [254, 242, 242];
                        } else if (status === 'processing') {
                            data.cell.styles.textColor = [59, 130, 246];
                            data.cell.styles.fontStyle = 'bold';
                            data.cell.styles.fillColor = [239, 246, 255];
                        } else if (status === 'initiated') {
                            data.cell.styles.textColor = [234, 179, 8];
                            data.cell.styles.fontStyle = 'bold';
                            data.cell.styles.fillColor = [254, 252, 232];
                        } else if (status === 'returned') {
                            data.cell.styles.textColor = [249, 115, 22];
                            data.cell.styles.fontStyle = 'bold';
                            data.cell.styles.fillColor = [255, 247, 237];
                        }
                    }
                    
                    // Format amount with ₹ symbol in bold
                    if (data.section === 'body' && data.column.index === 5) {
                        data.cell.styles.fontStyle = 'bold';
                        data.cell.styles.textColor = [30, 58, 138];
                    }
                }
            });

            setExportProgress(80);

            // ─── Footer with Page Numbers ──────────────────────────────
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                
                // Footer line
                doc.setDrawColor(203, 213, 225);
                doc.setLineWidth(0.3);
                doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
                
                // Footer text
                doc.setFontSize(7);
                doc.setTextColor(150, 150, 150);
                doc.setFont('helvetica', 'normal');
                doc.text(
                    `Page ${i} of ${pageCount}`,
                    margin,
                    pageHeight - 6
                );
                doc.text(
                    `Total Records: ${transactions.length} | Generated: ${new Date().toLocaleString('en-IN')}`,
                    pageWidth - margin - 60,
                    pageHeight - 6
                );
            }

            setExportProgress(90);
            setStatus('complete');

            // ─── Download PDF ──────────────────────────────────────────
            const fileName = `Transactions_Report_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);
            
            setExportProgress(100);
            
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setExportProgress(0);
            }, 2000);

        } catch (err) {
            console.error('Error exporting PDF:', err);
            alert('Failed to export PDF. Please try again.');
            setStatus('idle');
        } finally {
            setLoading(false);
        }
    };

    const getStatusDisplay = (status) => {
        if (!status) return 'Unknown';
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop with blur */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full transform transition-all duration-300 ease-out animate-slide-up">
                    
                    {/* Decorative Gradient Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-t-2xl"></div>

                    {/* ─── Header ────────────────────────────────────────── */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 rounded-xl">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Export Transactions</h2>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    Generate a comprehensive PDF report
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={status === 'fetching' || status === 'generating'}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 disabled:opacity-50 group"
                        >
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* ─── Body ──────────────────────────────────────────── */}
                    <div className="p-6 space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                                <p className="text-sm text-blue-600 font-medium">Total Records</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{totalRecords.toLocaleString()}</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                                <p className="text-sm text-purple-600 font-medium">Export Format</p>
                                <p className="text-xl font-semibold text-gray-900 mt-1 flex items-center gap-2">
                                    <span>PDF</span>
                                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">Document</span>
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                                <p className="text-sm text-green-600 font-medium">File Size</p>
                                <p className="text-xl font-semibold text-gray-900 mt-1">
                                    {totalRecords > 0 ? `${Math.min(totalRecords * 0.5, 5).toFixed(1)} MB` : 'N/A'}
                                </p>
                            </div>
                        </div>

                        {/* Filters Display */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                <p className="text-sm font-medium text-gray-700">Applied Filters</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {filters.from_date && filters.to_date && (
                                    <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 flex items-center gap-1.5 shadow-sm">
                                        <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {filters.from_date} → {filters.to_date}
                                    </span>
                                )}
                                {filters.merchant_id && (
                                    <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 flex items-center gap-1.5 shadow-sm">
                                        <svg className="w-3.5 h-3.5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        {filters.merchant_id}
                                    </span>
                                )}
                                {filters.api_used && (
                                    <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 flex items-center gap-1.5 shadow-sm">
                                        <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                        {filters.api_used}
                                    </span>
                                )}
                                {filters.status && (
                                    <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 flex items-center gap-1.5 shadow-sm">
                                        <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {getStatusDisplay(filters.status)}
                                    </span>
                                )}
                                {filters.search && (
                                    <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 flex items-center gap-1.5 shadow-sm">
                                        <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        "{filters.search}"
                                    </span>
                                )}
                                {!filters.from_date && !filters.merchant_id && !filters.api_used && !filters.status && !filters.search && (
                                    <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-500">
                                        No filters applied - exporting all transactions
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Progress Section */}
                        {(status === 'fetching' || status === 'generating') && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {status === 'fetching' ? 'Fetching transactions...' : 'Generating PDF...'}
                                        </span>
                                    </div>
                                    <span className="text-sm font-bold text-blue-600">{exportProgress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${exportProgress}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Starting...</span>
                                    <span>{exportProgress < 40 ? 'Fetching data' : exportProgress < 80 ? 'Building table' : 'Finalizing'}</span>
                                    <span>Complete</span>
                                </div>
                            </div>
                        )}

                        {/* Success Message */}
                        {status === 'complete' && (
                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-fade-in">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-full">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-green-800">Export Complete! 🎉</p>
                                        <p className="text-xs text-green-600">Your PDF has been downloaded successfully.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            {status === 'idle' && (
                                <>
                                    <button
                                        onClick={generatePDF}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Generate PDF
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}

                            {(status === 'fetching' || status === 'generating') && (
                                <>
                                    <button
                                        disabled
                                        className="flex-1 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl font-medium flex items-center justify-center gap-2 cursor-not-allowed"
                                    >
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </button>
                                    <button
                                        onClick={onClose}
                                        disabled
                                        className="px-6 py-3 border-2 border-gray-200 text-gray-400 rounded-xl cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}

                            {status === 'complete' && (
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Close
                                </button>
                            )}
                        </div>

                        {/* Footer Note */}
                        <div className="flex items-center justify-center gap-2 pt-2">
                            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-gray-400">
                                Maximum 1000 transactions will be exported
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style>{`
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default TransactionExportScreen;