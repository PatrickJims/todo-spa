module.exports = (req, res, next) => {
    const { name, email, password } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\,-]?\w+)*@\w+([\,-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        if (![name, email, password].every(Boolean)) {
            return res.status(401).json("Missing credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }
    else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }

    next();
}