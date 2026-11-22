// Espaços de foto autoral do site (RF-10). Coloque o arquivo em public/fotos/<nome>.(jpg|jpeg|png|webp|avif)
// e ele substitui a arte gerada automaticamente no próximo build/deploy.
export const ESPACOS_FOTO = {
  equipe: { alt: "Equipe da Brimajor em Manaus", legenda: "Engenharia em Manaus/AM", icone: "Users" },
  bancada: { alt: "Bancada de eletrônica da Brimajor com placas e instrumentos", legenda: "Bancada de prototipagem", icone: "CircuitBoard" },
  prototipos: { alt: "Protótipos de hardware desenvolvidos pela Brimajor", legenda: "Protótipos em validação", icone: "Cpu" },
  aulas: { alt: "Turma em treinamento de inteligência artificial da Brimajor", legenda: "Treinamentos de IA", icone: "GraduationCap" },
} as const;

export type NomeFoto = keyof typeof ESPACOS_FOTO;
export const EXTENSOES_FOTO = ["webp", "avif", "jpg", "jpeg", "png"] as const;
