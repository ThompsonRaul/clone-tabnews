function status(request, response) {
  response.status(200).json({ mensagem: "Olá, gente!" });
}
export default status;
