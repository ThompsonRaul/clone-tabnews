function status(request, response) {
  response.status(200).json({ status: "Tudo ótimo por aqui!" });
}

export default status;
