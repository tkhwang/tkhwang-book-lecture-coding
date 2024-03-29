function statement(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performance.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return renderPlainText(statementData, invoice, plays)

  function totalAmount(data) {
    return data.performance.reduce((total, p) => total + p.volumeCredits, 0)
  }

  function totalVolumeCredits(data) {
    return data.performance.reduce((total, p) => total + p.volumeCredits, 0)
  }

  function renderPlainText(data, invoice, plays) {
    let result = `Statement for ${data.customer}\n`

    for (let perf of data.performances) {
      result += `  ${perf.play.name}: ${usd(perf.amount / 100)} (${
        perf.audience
      } seats)\n`
    }

    result += `Amount owed is ${usd(totalAmount())}\n`
    result += `You earned ${totalVolumeCredits()} credits\n`
    return result
  }

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
    return result

    function totalVolumeCredits() {
      for (let perf of data.performances) {
        volumeCredits += volumeCreditsFor(perf)
      }
    }
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100)
  }

  function amountFor(aPerformance) {
    let result = 0

    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break
      case "comedy":
        result = 30000
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`)
    }
    return result
  }

  function playFor(perf) {
    return plays[perf.playID]
  }

  function volumeCreditsFor(perf) {
    let result = 0
    result += Math.max(perf.audience - 30, 0)
    if ("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5)

    return result
  }
}
