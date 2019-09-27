<template>
  <div>
    <h1 class="mb-2 text-grey-lighter">Portfolio</h1>
    <div v-if="isLoading">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>Loading... ({{refCount}})</div>
    </div>
    <positions-list v-if="!isLoadingPositions" :positions="computedPositions">
      <template slot-scope="position">
        <div class="positions--item">
          <figure class="flex items-center mb-3">
            <img
              style="width:50%;"
              class="h-16 w-16 rounded-full mr-2"
              :src="`https://finviz.com/chart.ashx?t=${position.symbol}&ty=c&ta=1&p=d&s=l`"
              :alt="position.symbol"
            />
            <figcaption></figcaption>
            <div class="wrapper">
              <div class="table">
                <div class="row header">
                  <div class="cell">Change Today</div>
                  <div class="cell">Market Value</div>
                  <div class="cell">Avarage Entry Price</div>
                  <div class="cell">Side</div>
                </div>

                <div class="row">
                  <div class="cell" data-title="Name">{{position.unrealized_intraday_pl}}</div>
                  <div class="cell" data-title="Age">{{position.market_value}}</div>
                  <div class="cell" data-title="Occupation">{{position.avg_entry_price}}</div>
                  <div class="cell" data-title="Location">{{position.side}}</div>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </template>
    </positions-list>
    <label>fetchAssetInfo</label>
    <input-component v-on:name-submitted="fetchAssetInfo" />
    <label>postOrder</label>
    <input-component v-on:name-submitted="postOrder" />
    <label>delete position</label>
    <input-component v-on:name-submitted="deletePosition" />
    <h2 class="buying_power">
      ${{accountInfo.buying_power}}
      <small>Buying Power</small>
    </h2>
    <br />
    <h1>{{assetInfo}}</h1>
    <h1>{{orderSuccess}}</h1>
    <h1>{{deleted}}</h1>
  </div>
</template>

<script>
import { RepositoryFactory } from './../repositories/RepositoryFactory'
import { mapState } from 'vuex'
import InputComponent from './InputComponent'
import PositionsList from './PositionsList'

const AlpacaRepository = RepositoryFactory.get('alpaca')

export default {
  name: 'parent-component',
  components: {
    InputComponent,
    PositionsList
  },
  data () {
    return {
      accountInfo: {},
      positions: {},
      assetInfo: {},
      orderSuccess: {},
      deleted: {},
      polling: null,
      isLoadingPositions: true
    }
  },
  created () {
    this.fetchPositions()
    this.fetchAccount()
    this.pollData()
  },
  methods: {
    async fetchAccount () {
      const { data } = await AlpacaRepository.getAccount()
      this.accountInfo = data
      this.$store.commit('loading', false)
    },
    async fetchAssetInfo (ticker) {
      const { data } = await AlpacaRepository.getAssetInfo(ticker.tickerName)
      this.assetInfo = data
      this.$store.commit('loading', false)
    },
    async fetchPositions () {
      const { data } = await AlpacaRepository.getPositions()
      this.positions = data
      this.isLoadingPositions = false
    },
    async deletePosition (ticker) {
      const { data } = await AlpacaRepository.deletePosition(ticker.tickerName)
      this.deleted = data
      this.$store.commit('loading', false)
    },
    async postOrder (ticker) {
      let payload = {
        symbol: ticker.tickerName,
        qty: 1,
        side: 'buy',
        type: 'market',
        time_in_force: 'day'
      }
      const { data } = await AlpacaRepository.postOrder(payload)
      this.orderSuccess = data
      this.$store.commit('loading', false)
    },
    pollData () {
      this.polling = setInterval(() => {
        this.fetchPositions()
      }, 3000)
    }
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  computed: {
    ...mapState(['isLoading', 'refCount']),
    computedPositions () {
      return this.positions
    }
  }
}
</script>

<style>
/** https://loading.io/css/ */
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ddd;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}

.buying_power {
  font-size: 2rem;
}

.wrapper {
  margin: 0 auto;
  padding: 40px;
  max-width: 800px;
}

.table {
  margin: 0 0 40px 0;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: table;
}
.row {
  display: table-row;
  background: #f6f6f6;
}

.cell {
  padding: 6px 12px;
  display: table-cell;
}
</style>
