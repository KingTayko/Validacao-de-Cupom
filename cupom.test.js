
const {
  Cupom,
  ValidadorCupom,
  CupomExpiradoException,
  ValorCompraInvalidoException
} = require("./cupom");

describe("ValidadorCupom", () => {
  let validador;
  beforeEach(() => {
    validador = new ValidadorCupom();
  });

  test("Caminho Feliz", () => {
    const cupom = new Cupom("DESCONTO10", new Date(Date.now() + 86400000), 50.0, false);
    expect(validador.validar(cupom, 100.0)).toBe(true);
  });

  test("Cupom já usado", () => {
    const cupom = new Cupom("DESCONTO20", new Date(Date.now() + 86400000), 50.0, true);
    expect(() => validador.validar(cupom, 100.0)).toThrow(CupomExpiradoException);
  });

  test("Cupom expirado", () => {
    const ontem = new Date(Date.now() - 86400000);
    const cupom = new Cupom("DESCONTO30", ontem, 50.0, false);
    expect(() => validador.validar(cupom, 100.0)).toThrow(CupomExpiradoException);
  });

  test("Valor de compra abaixo do mínimo", () => {
    const cupom = new Cupom("DESCONTO40", new Date(Date.now() + 86400000), 200.0, false);
    expect(() => validador.validar(cupom, 100.0)).toThrow(ValorCompraInvalidoException);
  });

  test("Cupom no último dia de validade", () => {
    const hoje = new Date();
    const cupom = new Cupom("ULTIMODIA", hoje, 100.0, false);
    expect(validador.validar(cupom, 150.0)).toBe(true);
  });

  test("Caso de borda - valor de compra exatamente igual ao mínimo", () => {
    const cupom = new Cupom("IGUALMINIMO", new Date(Date.now() + 86400000), 100.0, false);
    expect(validador.validar(cupom, 100.0)).toBe(true);
  });
});
