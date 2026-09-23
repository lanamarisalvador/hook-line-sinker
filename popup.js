const button = document.getElementById('clickButton');
const result = document.getElementById('result');
const riskLevel = document.getElementById('riskLevel');
const warningSigns = document.getElementById('warningSigns');
const explanation = document.getElementById('explanation');
const resultsCard = document.querySelector('.results-card');

button.addEventListener(
    'click', 
    function() {
        result.textContent = 'Analyzing email...';
        resultsCard.style.display = 'none';
        chrome.tabs.query(
            {active: true, currentWindow: true},
            function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {message: 'getEmailData'}, async function(response) {
                    if(response.error) {
                    result.textContent = response.error;
                    return;
                    }
                    const text = response.text;
                    const links = response.links;
                    const emailData = {
                        text: text,
                        links: links
                    }
                    try {

                    const backendResponse = await fetch ('http://127.0.0.1:8000/analyze', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(emailData)
                    });
                    if (!backendResponse.ok) {
                        throw new Error('Backend request failed.');
                    }
                    const data = await backendResponse.json();
                    console.log(data);
                    riskLevel.textContent = data.risk_level;
                    if (data.risk_level === 'High') {
                        riskLevel.className = 'high-risk';
                    } else if (data.risk_level === 'Medium') {
                        riskLevel.className = 'medium-risk';
                    } else {
                        riskLevel.className = 'low-risk';
                    }
                    warningSigns.innerHTML = '';
                    for (const sign of data.warning_signs) {
                        const listItem = document.createElement('li');
                        listItem.textContent = sign;
                        warningSigns.appendChild(listItem);
                    }
                    explanation.textContent = data.explanation;
                    result.textContent = 'Analysis complete.';
                    resultsCard.style.display = 'block';
                    } catch (error) {
                        console.error(error);
                        result.textContent = 'An error occurred while analyzing the email.';
                    }
                });
            }
        )
    }
)