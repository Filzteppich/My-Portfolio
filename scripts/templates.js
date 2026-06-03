function getFeedbackTemplate(feedback, positionClass, slotIndex, clickHandler){
return `
      <article class="feedback-card ${positionClass}" data-feedback-slot="${slotIndex}"${clickHandler ? ` onclick="${clickHandler}"` : ''}>
        <div class="feedback-content">
          <div class="feedback-text">
            <span>${feedback.commentDe}</span>
          </div>
          <div class="feedback-author">
            <div class="feedback-horizontal-line">
              <hr>
            </div>
            <div class="feedback-author-name">${feedback.name} - ${feedback.relation}</div>
          </div>
        </div>
      </article>
    `;
} 