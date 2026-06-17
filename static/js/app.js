document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-btn');
    const notesContainer = document.getElementById('notes-container');

    // Initial fetch
    fetchNotes();

    refreshBtn.addEventListener('click', fetchNotes);

    async function fetchNotes() {
        setLoading(true);
        renderSkeletons();
        
        try {
            const response = await fetch('/api/notes');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            renderNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
            notesContainer.innerHTML = `
                <div class="note-card" style="text-align: center; color: #ef4444;">
                    <h3>Failed to load release notes.</h3>
                    <p>Please try again later.</p>
                </div>
            `;
        } finally {
            setLoading(false);
        }
    }

    function setLoading(isLoading) {
        if (isLoading) {
            refreshBtn.classList.add('loading');
            refreshBtn.disabled = true;
        } else {
            refreshBtn.classList.remove('loading');
            refreshBtn.disabled = false;
        }
    }

    function renderSkeletons() {
        notesContainer.innerHTML = `
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
        `;
    }

    function renderNotes(notes) {
        notesContainer.innerHTML = '';
        
        if (notes.length === 0) {
            notesContainer.innerHTML = '<p style="text-align:center; color: var(--text-muted);">No release notes found.</p>';
            return;
        }

        notes.forEach(note => {
            const date = new Date(note.updated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            const card = document.createElement('article');
            card.className = 'note-card';
            
            // Extract a plain text snippet for the tweet
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = note.content;
            let plainText = tempDiv.textContent || tempDiv.innerText || "";
            // Replace multiple whitespaces and newlines with a single space
            plainText = plainText.replace(/\s+/g, ' ').trim();
            if (plainText.length > 150) {
                plainText = plainText.substring(0, 150) + "...";
            }
            
            const tweetText = encodeURIComponent(`Check out this BigQuery update: ${note.title}\n\n${plainText}\n\nRead more: `);
            const tweetUrl = encodeURIComponent(note.link);
            const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

            card.innerHTML = `
                <div class="note-header">
                    <h2 class="note-title">
                        <a href="${note.link}" target="_blank" rel="noopener noreferrer">${note.title}</a>
                    </h2>
                    <span class="note-date">${date}</span>
                </div>
                <div class="note-content">
                    ${note.content}
                </div>
                <div class="note-actions">
                    <a href="${twitterIntentUrl}" target="_blank" rel="noopener noreferrer" class="btn tweet-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Tweet this Update
                    </a>
                </div>
            `;
            notesContainer.appendChild(card);
        });
    }
});
