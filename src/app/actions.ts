"use server";

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const interest = formData.get("interest");
  const details = formData.get("details");

  // Aqui entraria a integração real com o Resend, SendGrid ou SMTP corporativo
  // Exemplo:
  // await resend.emails.send({
  //   from: 'contato@brimajor.com',
  //   to: 'brimajor.ia@gmail.com',
  //   subject: `Nova Solicitação de Engenharia: ${interest}`,
  //   html: `<p>Nome: ${name}</p><p>Email: ${email}</p><p>Interesse: ${interest}</p><p>Detalhes: ${details}</p>`
  // });

  // Simulando o tempo de envio de e-mail seguro e sem erros de tipagem
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("E-mail corporativo (simulação) recebido com os dados:", { name, email, interest, details });

  return { success: true };
}
