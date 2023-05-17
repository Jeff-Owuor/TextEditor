import React, { useState, useEffect } from 'react';
import {marked} from 'marked';
import "./BlogEditor.css"

function BlogEditor() {
  const [markdown, setMarkdown] = useState('');
  const [preview, setPreview] = useState('');
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem('blog-drafts')) || [];
    setDrafts(savedDrafts);
  }, []);

  useEffect(() => {
    const html = marked(markdown);
    setPreview(html);
  }, [markdown]);

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleSaveDraft = () => {
    const newDrafts = [...drafts, markdown];
    setDrafts(newDrafts);
    localStorage.setItem('blog-drafts', JSON.stringify(newDrafts));
    setMarkdown('');
    setPreview('');
   
    
    const alertContainer = document.getElementById('alert-container');
  
    // Create new Bootstrap alert element
    const alert = document.createElement('div');
    alert.classList.add('alert', `alert-success`);
    alert.setAttribute('role', 'alert');
    alert.textContent = "Draft saved successfully!";
    
    // Add the alert to the container element
    alertContainer.appendChild(alert);
    
    // Remove the alert after 3 seconds
    setTimeout(() => {
      alertContainer.removeChild(alert);
    }, 3000);

  };

  const handlePublish = () => {
    localStorage.removeItem('blog-drafts');
    setMarkdown('');
    setPreview('');
    
    const alertContainer = document.getElementById('alert-container');

    const alert = document.createElement('div');
    alert.classList.add('alert', `alert-success`);
    alert.setAttribute('role', 'alert');
    alert.textContent = "Post published successfully!";
    
    // Add the alert to the container element
    alertContainer.appendChild(alert);
    
    // Remove the alert after 3 seconds
    setTimeout(() => {
      alertContainer.removeChild(alert);
    }, 3000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageMarkdown = `![${file.name}](${reader.result})`;
      const newMarkdown = `${markdown}\n${imageMarkdown}`;
      setMarkdown(newMarkdown);
    };
    reader.readAsDataURL(file);
  };
  const handleButtonClick = (tag) => {
    const startTag = `[${tag}]`;
    const endTag = `[/${tag}]`;
    const textArea = document.getElementById('markdown-textarea');
    const startPos = textArea.selectionStart;
    const endPos = textArea.selectionEnd;
    const selectedText = markdown.substring(startPos, endPos);
    const replacementText = startTag + selectedText + endTag;
    setMarkdown(markdown.substring(0, startPos) + replacementText + markdown.substring(endPos));
    textArea.focus();
    textArea.setSelectionRange(startPos + startTag.length, endPos + startTag.length);
  }

  return (
    <div className="blog-editor container mt-3">
    <div id="alert-container" style={{margin:0,top:0}}></div>
    <h1 className="mb-3 text-center">Blog Editor</h1>
      <div className="editorPane row">
      <div className="toolbar col-md-1">
        <button onClick={() => handleButtonClick('h1')} className="btn btn-secondary mb-2">H1</button>
        <button onClick={() => handleButtonClick('h2')} className="btn btn-info mb-2">H2</button>
        <button onClick={() => handleButtonClick('h3')} className="btn btn-primary mb-2">H3</button>
        <button onClick={() => handleButtonClick('strong')} className="btn btn-secondary mb-2">Bold</button>
        <button onClick={() => handleButtonClick('em')} className="btn btn-secondary mb-2">Italic</button>
      </div>
        <textarea id="markdown-textarea" value={markdown} onChange={handleMarkdownChange} placeholder="Write your blog post in Markdown format" className="col-md-4"></textarea>
        <div className="previewPane col-md-3" dangerouslySetInnerHTML={{ __html: preview }}></div>
        <div className="toolbar col-md-3">
          <label htmlFor="image-upload"><i className="fas fa-image btn mb-1"></i></label>
          <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload}  className="mb-2 btn"/>
          <button onClick={handleSaveDraft} className="btn btn-dark mb-2 btn-lg">Save as Draft</button>
          <button onClick={handlePublish}  className="btn btn-dark mb-2 btn-lg">Publish</button>
        </div>
      </div>
        <h3 className='text-center mt-3 mb-3 headerThree'>Drafts:</h3> 
      <div className="drafts-pane row">
          {drafts.map((draft, index) => (
            <div claesName="card col-md-3" style={{width: "18rem",marginRight:"8px"}} key={index}>
            <div className="card-body">
                <h5 className="card-title">Blog- {index}</h5>
                <p className="card-text"onClick={() => setMarkdown(draft)}>{draft}</p>
            </div>
        </div>
        
          ))}
       
      </div>

    </div>
  );
}

export default BlogEditor;
