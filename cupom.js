
class Cupom {
  constructor(codigo, dataValidade, valorMinimoCompra, usado = false) {
    this.codigo = codigo;
    this.dataValidade = dataValidade;
    this.valorMinimoCompra = valorMinimoCompra;
    this.usado = usado;
  }
}

class CupomExpiradoException extends Error {
  constructor(message) {
    super(message);
    this.name = "CupomExpiradoException";
  }
}

class ValorCompraInvalidoException extends Error {
  constructor(message) {
    super(message);
    this.name = "ValorCompraInvalidoException";
  }
}

class ValidadorCupom {
  validar(cupom, valorCompra) {
    const hoje = new Date();

    if (cupom.usado) {
      throw new CupomExpiradoException("O cupom já foi usado.");
    }

    if (hoje > cupom.dataValidade ) {
      throw new CupomExpiradoException("O cupom está expirado.");
    }

    if (valorCompra < cupom.valorMinimoCompra) {
      throw new ValorCompraInvalidoException("Valor da compra abaixo do mínimo exigido.");
    }

    return true;
  }
}

module.exports = {
  Cupom,
  ValidadorCupom,
  CupomExpiradoException,
  ValorCompraInvalidoException
};
