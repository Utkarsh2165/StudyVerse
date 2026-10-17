import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownRendererProps {
  content: string;
}

/**
 * Pre-process markdown text to:
 * 1. Convert block math \[ ... \] to $$ ... $$
 * 2. Convert inline math \( ... \) to $ ... $
 * 3. Clean up raw unwrapped LaTeX keywords like \times, \text{...}, \frac{...} if emitted in raw text
 * 4. Ensure tables have proper line breaks before and after so GFM parser recognizes them reliably
 * 5. Remove excessive blank lines or broken spacing
 */
function preprocessMarkdown(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // 1. Convert LaTeX display delimiters \[ ... \] to $$ ... $$
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_match, eq) => `\n$$\n${eq.trim()}\n$$\n`);

  // 2. Convert LaTeX inline delimiters \( ... \) to $ ... $
  text = text.replace(/\\\(([\s\S]*?)\\\)/g, (_match, eq) => `$${eq.trim()}$`);

  // 3. Ensure markdown tables have a newline before and after to trigger GFM table parsing
  // Matches lines that start with | and separates them cleanly from previous text
  text = text.replace(/([^\n])\n(\|[^\n]+\|)/g, '$1\n\n$2');
  text = text.replace(/(\|[^\n]+\|)\n([^\n|])/g, '$1\n\n$2');

  // 4. Handle unwrapped LaTeX commands in plain text (e.g. F = m \times a or 5 \text{ kg})
  // If \times is outside $, convert to clean multiplication symbol × or wrap in math
  // First, protect existing $...$ and $$...$$
  const mathSegments: string[] = [];
  const placeholderPrefix = '___MATH_PLACEHOLDER_';
  
  // Temporarily pull out block math $$ ... $$
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match) => {
    const idx = mathSegments.length;
    mathSegments.push(match);
    return `${placeholderPrefix}${idx}___`;
  });

  // Temporarily pull out inline math $ ... $
  text = text.replace(/\$([^\$\n]+?)\$/g, (match) => {
    const idx = mathSegments.length;
    mathSegments.push(match);
    return `${placeholderPrefix}${idx}___`;
  });

  // Now, in non-math text, replace stray LaTeX artifacts that sometimes leak from LLMs:
  // e.g. \times -> ×
  text = text.replace(/\\times/g, '×');
  // e.g. \text{kg} -> kg, \text{m/s}^2 -> m/s²
  text = text.replace(/\\text\{([^}]+)\}/g, '$1');
  // e.g. \approx -> ≈
  text = text.replace(/\\approx/g, '≈');
  // e.g. \pm -> ±
  text = text.replace(/\\pm/g, '±');
  // e.g. \leq -> ≤, \geq -> ≥
  text = text.replace(/\\leq/g, '≤');
  text = text.replace(/\\geq/g, '≥');
  // e.g. \rightarrow -> →
  text = text.replace(/\\rightarrow/g, '→');
  // e.g. \Delta -> Δ
  text = text.replace(/\\Delta/g, 'Δ');
  // e.g. \theta -> θ
  text = text.replace(/\\theta/g, 'θ');
  // e.g. \pi -> π
  text = text.replace(/\\pi/g, 'π');
  // e.g. \degree or ^\circ -> °
  text = text.replace(/\\degree/g, '°');
  text = text.replace(/\^\\circ/g, '°');

  // Restore math segments
  text = text.replace(new RegExp(`${placeholderPrefix}(\\d+)___`, 'g'), (_match, id) => {
    return mathSegments[parseInt(id, 10)] || '';
  });

  return text;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const processed = preprocessMarkdown(content);

  return (
    <div className="w-full text-slate-200 text-xs sm:text-sm font-sans space-y-2 break-words overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: false }]]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-base sm:text-lg font-extrabold text-white mt-3.5 mb-1.5 pb-1 border-b border-purple-500/25 flex items-center gap-1.5">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm sm:text-base font-bold text-purple-300 mt-3 mb-1 flex items-center gap-1.5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs sm:text-sm font-bold text-cyan-300 mt-2 mb-1">
              {children}
            </h3>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="my-1.5 leading-relaxed text-slate-200 break-words">
              {children}
            </p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-4 sm:pl-5 my-2 space-y-1 text-slate-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-4 sm:pl-5 my-2 space-y-1 text-slate-200">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-0.5">
              {children}
            </li>
          ),

          // Tables: Wrapped in scrollable container to prevent mobile overflow!
          table: ({ children }) => (
            <div className="my-3 w-full overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-950/70 shadow-sm max-w-full">
              <table className="w-full text-left border-collapse text-xs">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-purple-950/70 border-b border-purple-800/40 text-cyan-300 font-bold uppercase tracking-wider text-[11px]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-800/80">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-900/60 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 sm:px-4 sm:py-2.5 font-bold text-cyan-300 whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 sm:px-4 sm:py-2.5 text-slate-200 align-top leading-relaxed">
              {children}
            </td>
          ),

          // Code blocks & inline code
          code: ({ className, children, ...props }) => {
            const isInline = !className && typeof children === 'string' && !children.includes('\n');
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[11px] sm:text-xs border border-slate-700/60 break-all"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className="text-xs font-mono text-cyan-300 block overflow-x-auto p-1" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-2.5 p-3 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto text-xs font-mono text-slate-200 max-w-full">
              {children}
            </pre>
          ),

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="my-2 border-l-4 border-purple-500 bg-purple-950/30 px-3.5 py-1.5 rounded-r-lg text-slate-300 italic text-xs sm:text-sm">
              {children}
            </blockquote>
          ),

          // Bold & Italic
          strong: ({ children }) => (
            <strong className="font-bold text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-purple-200">
              {children}
            </em>
          ),
          hr: () => (
            <hr className="my-3 border-t border-slate-800" />
          )
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
};
