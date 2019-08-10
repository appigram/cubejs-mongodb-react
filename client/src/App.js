import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Pie, Bar } from 'react-chartjs-2'
import moment from 'moment'
import numeral from 'numeral'
import cubejs from '@cubejs-client/core'
import Chart from './Chart.js'

const cubejsApi = cubejs(
  process.env.REACT_APP_CUBEJS_TOKEN,
  { apiUrl: process.env.REACT_APP_API_URL }
)
const numberFormatter = item => numeral(item).format('0,0')
const dateFormatter = item => moment(item).format('MMM YY')

const renderSingleValue = (resultSet, key) => (
  <h1 height={300}>{numberFormatter(resultSet.chartPivot()[0][key])}</h1>
)

const chartJsData = (resultSet) => {
  return {
    datasets: [{
      data: resultSet.series()[0].series.map((r) => { return r.value }),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)'
      ]
    }],
    labels: resultSet.categories().map((c) => { return c.category })
  }
}

class App extends Component {
  render () {
    return (
      <Container fluid>
        <Row>
          <Col sm='4'>
            <Chart
              cubejsApi={cubejsApi}
              title='Total Tweets'
              query={{
                measures: ['Tweets.count']
              }}
              render={resultSet => renderSingleValue(resultSet, 'total-tweets')}
            />
          </Col>
          <Col sm='4'>
            <Chart
              cubejsApi={cubejsApi}
              title='Total Retweets'
              query={{
                measures: ['Tweets.retweetCount']
              }}
              render={resultSet => renderSingleValue(resultSet, 'total-retweets')}
            />
          </Col>
          <Col sm='4'>
            <Chart
              cubejsApi={cubejsApi}
              title='Total Favorites'
              query={{
                measures: ['Tweets.favoriteCount']
              }}
              render={resultSet => renderSingleValue(resultSet, 'total-favorites')}
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col sm='6'>
            <Chart
              cubejsApi={cubejsApi}
              title='Top Tweets Locations'
              query={{
                measures: ['Tweets.count'],
                dimensions: ['Tweets.location'],
                filters: [
                  {
                    dimension: 'Tweets.location',
                    operator: 'notEquals',
                    values: ['']
                  }
                ],
                limit: 5
              }}
              render={resultSet => (
                <Pie data={chartJsData(resultSet)} />
              )}
            />
          </Col>
          <Col sm='6'>
            <Chart
              cubejsApi={cubejsApi}
              title='Most Popular Languages'
              query={{
                measures: ['Tweets.count'],
                dimensions: ['Tweets.lang'],
                limit: 5
              }}
              render={resultSet => {
                return (
                  <Bar data={chartJsData(resultSet)} options={{ legend: { display: false } }} />
                )
              }}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
