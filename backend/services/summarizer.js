function summarizeEdital(text) {
    if (!text) return 'Sem conteúdo para resumir.';
    const keywords = ['objeto', 'prazo', 'local', 'requisitos', 'documentação', 'valor'];
    const sentences = text.split(/[.!?]+/);
    const relevantSentences = sentences.filter(sentence =>
        keywords.some(keyword => sentence.toLowerCase().includes(keyword.toLowerCase()))
    );
    const summary = relevantSentences.slice(0, 3).join('. ').trim();
    return summary || 'Edital identificado sem resumo automático claro. Verifique o documento original.';
}
module.exports = { summarizeEdital };
