document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shortener-form');
    const urlInput = document.getElementById('url-input');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');
    const shortUrlOutput = document.getElementById('short-url-output');
    const copyBtn = document.getElementById('copy-btn');
    const copyText = document.getElementById('copy-text');
    const copyIcon = document.getElementById('copy-icon');
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');

    // Initialize Lucide Icons
    lucide.createIcons();

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous states
        resultContainer.classList.add('hidden');
        errorContainer.classList.add('hidden');
        
        let url = urlInput.value.trim();
        
        // Normalize URL if not starting with protocol
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }

        // Show loading state
        submitBtn.disabled = true;
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Shortening...</span><i data-lucide="loader" class="animate-spin"></i>`;
        lucide.createIcons();

        try {
            const response = await fetch('/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (response.ok && data.id) {
                // Construct short URL using current host
                const shortUrl = `${window.location.origin}/url/${data.id}`;
                shortUrlOutput.value = shortUrl;
                
                // Show result container
                resultContainer.classList.remove('hidden');
                
                // Reset copy button if previously copied
                resetCopyButton();
            } else {
                showError(data.msg || 'Failed to shorten URL. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Network error. Please check your connection and try again.');
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
            lucide.createIcons();
        }
    });

    // Copy to Clipboard Action
    copyBtn.addEventListener('click', async () => {
        const urlToCopy = shortUrlOutput.value;
        if (!urlToCopy) return;

        try {
            await navigator.clipboard.writeText(urlToCopy);
            
            // UI state change to Success
            copyBtn.classList.add('copied');
            copyText.textContent = 'Copied!';
            copyBtn.setAttribute('title', 'Copied successfully');
            
            // Temporarily change icon to checkmark
            copyIcon.setAttribute('data-lucide', 'check');
            lucide.createIcons();

            // Reset back after 3 seconds
            setTimeout(() => {
                resetCopyButton();
            }, 3000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            showError('Could not copy automatically. Please copy the URL manually.');
        }
    });

    // Reset Copy Button to default state
    function resetCopyButton() {
        copyBtn.classList.remove('copied');
        copyText.textContent = 'Copy';
        copyBtn.setAttribute('title', 'Copy to clipboard');
        copyIcon.setAttribute('data-lucide', 'copy');
        lucide.createIcons();
    }

    // Show Error function
    function showError(message) {
        errorMessage.textContent = message;
        errorContainer.classList.remove('hidden');
    }
});
