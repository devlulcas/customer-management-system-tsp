import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Variáveis de ambiente para conexão com o banco de dados não foram definidas."
  );
}

export const sql = postgres(process.env.DATABASE_URL);
