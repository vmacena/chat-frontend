export function formatarDataMensagem(dateString: string): string {
  const data = new Date(dateString);
  const agora = new Date();

  const mesmaData = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);

  const horaMinuto = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (mesmaData(data, agora)) {
    return horaMinuto;
  }

  if (mesmaData(data, ontem)) {
    return `ontem às ${horaMinuto}`;
  }

  const dataFormatada = data.toLocaleDateString("pt-BR");
  return `${dataFormatada} às ${horaMinuto}`;
}
