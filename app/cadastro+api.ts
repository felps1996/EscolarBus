// Esse código roda no lado do servidor, não no celular!
export async function POST(request: Request) {
  const body = await request.json();
  const { usuario, senha } = body;

  // Aqui futuramente faremos a gravação no banco de dados em nuvem
  console.log("Recebido no servidor do Expo:", usuario);

  if (!usuario || !senha) {
    return Response.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  // Simulando sucesso
  return Response.json({ 
    message: "Usuário cadastrado com sucesso!",
    user: { usuario } 
  }, { status: 201 });
}