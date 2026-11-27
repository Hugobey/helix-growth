import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { lexer, type Token, type Tokens } from "marked";
import { CAL } from "../content";
import { isPullQuote, slugify, type Block } from "./parse";
import { Figure } from "./figures";

function paragraph(token: Token): Tokens.Paragraph | null {
  return token.type === "paragraph" ? (token as Tokens.Paragraph) : null;
}

function childrenOf(token: Token): Token[] | undefined {
  if ("tokens" in token && Array.isArray(token.tokens)) return token.tokens;
  return undefined;
}

function inline(tokens: Token[] | undefined): ReactNode {
  if (!tokens) return null;
  return tokens.map((token, index) => renderInline(token, index));
}

function renderInline(token: Token, index: number): ReactNode {
  const nested = childrenOf(token);
  if (token.type === "text") return nested ? <span key={index}>{inline(nested)}</span> : token.text;
  if (token.type === "strong") return <strong key={index}>{inline(nested)}</strong>;
  if (token.type === "em") return <em key={index}>{inline(nested)}</em>;
  if (token.type === "br") return <br key={index} />;
  if (token.type === "escape") return token.text;
  if (token.type === "codespan") return <code key={index}>{token.text}</code>;
  if (token.type === "link") return <ArticleLink key={index} href={token.href} text={inline(nested)} label={token.text} />;
  return token.raw;
}

function ArticleLink({ href, text, label }: { href: string; text: ReactNode; label: string }) {
  if (label === "Let's grow your app") {
    return (
      <a className="bg-accent" href={CAL} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return <Link to={href}>{text}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
}

function MarkdownTokens({ tokens }: { tokens: Token[] }) {
  return tokens.map((token, index) => {
    if (token.type === "space") return null;
    if (token.type === "paragraph") {
      const block = paragraph(token);
      if (!block) return null;
      if (isPullQuote(block)) {
        return (
          <p key={index} className="article-pull">
            {inline(block.tokens)}
          </p>
        );
      }
      const only = (block.tokens ?? []).filter((item) => item.type !== "text" || item.text.trim() !== "");
      if (only.length === 1 && only[0].type === "link" && only[0].text === "Let's grow your app") {
        return (
          <p key={index} className="article-cta">
            {inline(block.tokens)}
          </p>
        );
      }
      return <p key={index}>{inline(block.tokens)}</p>;
    }
    if (token.type === "heading") {
      const heading = token as Tokens.Heading;
      if (heading.depth === 3) return <h3 key={index}>{inline(heading.tokens)}</h3>;
      return <h2 key={index} id={slugify(heading.text)}>{inline(heading.tokens)}</h2>;
    }
    if (token.type === "list") {
      const list = token as Tokens.List;
      return (
        <ul key={index} className="article-list">
          {list.items.map((item) => (
            <li key={item.raw}>{inline(item.tokens)}</li>
          ))}
        </ul>
      );
    }
    if (token.type === "hr") return <hr key={index} />;
    return null;
  });
}

export function Markdown({ text }: { text: string }) {
  return <MarkdownTokens tokens={lexer(text)} />;
}

export function ArticleBlocks({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => {
    if (block.type === "figure") return <Figure key={index} name={block.name} />;
    if (block.type === "takeaways") return <Takeaways key={index} text={block.text} />;
    if (block.type === "faq") {
      return (
        <section key={index} className="article-faq">
          <Markdown text={block.text} />
        </section>
      );
    }
    return <Markdown key={index} text={block.text} />;
  });
}

function Takeaways({ text }: { text: string }) {
  const tokens = lexer(text);
  const first = tokens.find((token) => {
    const block = paragraph(token);
    return block ? isPullQuote(block) : false;
  });
  const quote = first ? paragraph(first) : null;
  const rest = first ? tokens.filter((token) => token !== first) : tokens;
  return (
    <aside className="article-takeaways">
      {quote ? <p className="article-takeaways-title">{inline(quote.tokens)}</p> : null}
      <MarkdownTokens tokens={rest} />
    </aside>
  );
}
