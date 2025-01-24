document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const crewId = document.getElementById('crew-id').value;
    const password = document.getElementById('password').value;

    const response = await fetch('BSPCREW.csv');
    const data = await response.text();
    const rows = data.split('\n').map(row => row.split(','));

    const crew = rows.find(row => row[0] === crewId && row[1] === password);

    if (crew) {
        localStorage.setItem('crewId', crew[0]);
        localStorage.setItem('crewName', crew[2]);
        localStorage.setItem('crewDesg', crew[3]);
        localStorage.setItem('crewHq', crew[4]);
        window.location.href = 'runningroom.html';
    } else {
        alert('Invalid Crew ID or Password');
    }
});
