function handleError(err, req, res, next) {
  console.error(err);


  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ error: `${field} already exists` });
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ error: messages.join(", ") });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Unauthorized: " + err.message });
  }

  return res.status(500).json({ error: err.message || "Server Error" });
}

function getErrorMessage(err) {
  if (err.name === "ValidationError") {
    return Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return `${field} already exists`;
  }
  return err.message || "Unknown server error";
}

export default {
  handleError,
  getErrorMessage,
};
