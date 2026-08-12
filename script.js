document.getElementById("registerForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("phone").value;
    const branch = document.getElementById("branch").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Get selected branch
    
    
    if (!branch || branch.trim() === "") {
        alert("Branch is required!");
        return;
    }

    const student = {
        name: name,
        email: email,
        mobile: mobile,
        branch: branch,
        password: password
    };

    try {

        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const result = await response.json();

        if (result.success) {
            alert("Registration Successful!");
        } else {
            alert("Registration Failed!");
        }

    } catch (error) {
        console.error(error);
        alert("Could not connect to server!");
    }
});