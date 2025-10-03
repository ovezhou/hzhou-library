<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>
  </div>

  <main>
    <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>

    <div v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <span>{{ weatherData.weather[0].description }}</span>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const apikey = '95fab6f60a56f3f6807558a287eb65d8'

export default {
  name: 'App',
  data() {
    return {
      city: '',
      weatherData: null,
      errorMsg: '',
      hourlyForecast: [],
      dailyForecast: [],
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null
    },
    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
          await this.fetchWeatherData({ lat: latitude, lon: longitude })
        })
      }
    },
    async searchByCity() {
      this.errorMsg = ''
      this.weatherData = null
      if (!this.city.trim()) {
        this.errorMsg = 'Please enter city name, like Clayton, AU'
        return
      }
      await this.fetchWeatherData({ q: this.city.trim() })
    },
    async fetchWeatherData(extraParams = {}) {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            ...extraParams,
            appid: apikey,
            units: 'metric',
          },
        })
        this.weatherData = response.data
      } catch (error) {
        if (error.response?.status === 401) {
          this.errorMsg = '401 Unauthorized: API key is invalid or missing.'
        } else if (error.response?.status === 404) {
          this.errorMsg = 'City not found. Please check your input.'
        } else {
          this.errorMsg = 'Failed to fetch weather data.'
        }
        console.error('Error fetching weather data:', error)
      }
    },
  },
}
</script>
