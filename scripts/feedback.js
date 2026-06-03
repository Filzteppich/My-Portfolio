    const feedbacks = [
    {
      name: 'Steven Rudko',
      commentDe: 'Die Zusammenarbeit mit Khang in unserem Gruppenprojekt war ein voller Erfolg. Die Coding-Qualität seiner Beiträge war herausragend und die Zusammenarbeit stets angenehm und produktiv. Was Khang aber besonders macht, ist seine Persönlichkeit: Ich habe in ihm nicht nur einen exzellenten Partner, sondern auch einen Freund gefunden. Khang ist sowohl technisch als auch menschlich eine große Bereicherung für jedes Team.',
      commentEn: 'Working with Khang on our group project was a complete success. The coding quality of his contributions was outstanding, and the collaboration was always pleasant and productive. But what makes Khang truly special is his personality: I found in him not only an excellent partner but also a friend. Khang is a great asset to any team, both technically and personally.',
      relation: 'Teampartner'
    },{
      name: 'Nawied Syed',
      commentDe: 'Mit Khang habe ich im Projekt gut zusammenarbeiten können. Er hat seine Aufgaben termingerecht erledigt und sich in technische Abstimmungen sachlich eingebracht.',
      commentEn: 'I was able to work well with Khang on the project. He completed his tasks on time and contributed constructively to technical discussions..',
      relation: 'Teampartner'
    },{
      name: 'Michele Korfmacher',
      commentDe: 'Khang zeigte während unserer gemeinsamen Projektarbeit eine hohe Lernbereitschaft und großes Interesse an neuen Technologien. Mit seinem schnellen Verständnis für technische Zusammenhänge und seiner Fähigkeit, pragmatische Lösungen zu finden, trug er maßgeblich zum Fortschritt unseres Projekts bei. Besonders positiv blieb mir seine ausgeprägte Teamfähigkeit in Erinnerung.',
      commentEn: 'During our joint project work, Khang demonstrated a strong willingness to learn and a keen interest in new technologies. His quick grasp of technical concepts and his ability to find pragmatic solutions made a significant contribution to the projects progress. I particularly remember his excellent teamwork skills.',
      relation: 'Teampartner'
    }
  ]

  const feedbackTrackOffsets = [-2, -1, 0, 1, 2];
  const feedbackTransitionDuration = 350;
  const feedbackState = {
    activeIndex: 0,
    isAnimating: false
  };

  let feedbackRef;
  let dotsRef;

  document.addEventListener('DOMContentLoaded', initFeedbackSlider);

  function initFeedbackSlider() {
    feedbackRef = document.getElementById('feedbackCard');
    dotsRef = document.getElementById('feedbackDots');

    if (!feedbackRef || !dotsRef || feedbacks.length === 0) {
      return;
    }

    document.getElementById('feedbackPrevious')?.addEventListener('click', () => updateActiveFeedback(feedbackState.activeIndex - 1));
    document.getElementById('feedbackNext')?.addEventListener('click', () => updateActiveFeedback(feedbackState.activeIndex + 1));
    window.addEventListener('resize', () => {
      if (!feedbackState.isAnimating) {
        positionFeedbackTrack(2);
      }
    });

    renderFeedbackSlider();
  }

  function updateActiveFeedback(nextIndex) {
    const targetIndex = getLoopedIndex(nextIndex);

    if (feedbackState.isAnimating || targetIndex === feedbackState.activeIndex) {
      return;
    }

    const slidePlan = getSlidePlan(targetIndex);
    feedbackState.isAnimating = true;
    animateFeedbackJump(slidePlan, targetIndex);
  }

  function renderFeedbackSlider() {
    renderFeedbackTrack(feedbackTrackOffsets, 2);

    dotsRef.innerHTML = feedbacks.map((feedback, index) => `
      <button
        class="radio-button${index === feedbackState.activeIndex ? ' is-active' : ''}"
        type="button"
        aria-label="Show feedback from ${feedback.name}"
        aria-pressed="${index === feedbackState.activeIndex}"
        data-feedback-index="${index}"
      ></button>
    `).join('');

    dotsRef.querySelectorAll('[data-feedback-index]').forEach((button) => {
      button.addEventListener('click', () => updateActiveFeedback(Number(button.dataset.feedbackIndex)));
    });

    positionFeedbackTrack(2);
  }

  function renderFeedbackTrack(offsets, focusSlot) {
    feedbackRef.innerHTML = `
      <div class="feedback-track">
        ${offsets.map((offset, slotIndex) => createFeedbackCard(offset, slotIndex, focusSlot)).join('')}
      </div>
    `;
  }

  function createFeedbackCard(offset, slotIndex, focusSlot) {
    const feedback = feedbacks[getLoopedIndex(feedbackState.activeIndex + offset)];

    return `
      <article class="feedback-card ${getFeedbackCardPosition(slotIndex, focusSlot)}" data-feedback-slot="${slotIndex}">
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

  function positionFeedbackTrack(targetSlot, shouldAnimate = false, duration = feedbackTransitionDuration) {
    const track = feedbackRef.querySelector('.feedback-track');
    const targetCard = track?.querySelector(`[data-feedback-slot="${targetSlot}"]`);

    if (!track || !targetCard) {
      return;
    }

    const targetOffset = (feedbackRef.clientWidth / 2) - (targetCard.offsetLeft + targetCard.offsetWidth / 2);
    track.style.transition = shouldAnimate ? `transform ${duration}ms ease` : 'none';
    track.style.transform = `translateX(${targetOffset}px)`;
  }

  function animateFeedbackJump(slidePlan, targetIndex) {
    const animationOffsets = getAnimationOffsets(slidePlan.direction, slidePlan.steps);
    const startSlot = slidePlan.direction === 'next' ? 2 : slidePlan.steps + 2;
    const targetSlot = slidePlan.direction === 'next' ? slidePlan.steps + 2 : 2;
    const animationDuration = getAnimationDuration(slidePlan.steps);

    renderFeedbackTrack(animationOffsets, targetSlot);
    positionFeedbackTrack(startSlot);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        positionFeedbackTrack(targetSlot, true, animationDuration);
      });
    });

    window.setTimeout(() => {
      feedbackState.activeIndex = targetIndex;
      renderFeedbackSlider();
      feedbackState.isAnimating = false;
    }, animationDuration);
  }

  function getAnimationOffsets(direction, steps) {
    const startOffset = direction === 'next' ? -2 : -(steps + 2);
    const endOffset = direction === 'next' ? steps + 2 : 2;

    return Array.from({ length: endOffset - startOffset + 1 }, (_, index) => startOffset + index);
  }

  function getAnimationDuration(steps) {
    return feedbackTransitionDuration * steps;
  }

  function getSlidePlan(nextIndex) {
    const lastIndex = feedbacks.length - 1;

    if (feedbackState.activeIndex === 0 && nextIndex === lastIndex) {
      return {
        direction: 'next',
        steps: feedbacks.length - 1
      };
    }

    if (feedbackState.activeIndex === lastIndex && nextIndex === 0) {
      return {
        direction: 'previous',
        steps: feedbacks.length - 1
      };
    }

    if (nextIndex > feedbackState.activeIndex) {
      return {
        direction: 'next',
        steps: nextIndex - feedbackState.activeIndex
      };
    }

    return {
      direction: 'previous',
      steps: feedbackState.activeIndex - nextIndex
    };
  }

  function getLoopedIndex(index) {
    return (index + feedbacks.length) % feedbacks.length;
  }

  function getFeedbackCardPosition(slotIndex, focusSlot) {
    const distance = slotIndex - focusSlot;

    if (distance <= -2) {
      return 'feedback-card-far-left';
    }

    if (distance === -1) {
      return 'feedback-card-left';
    }

    if (distance === 0) {
      return 'feedback-card-center';
    }

    if (distance === 1) {
      return 'feedback-card-right';
    }

    return 'feedback-card-far-right';
  }