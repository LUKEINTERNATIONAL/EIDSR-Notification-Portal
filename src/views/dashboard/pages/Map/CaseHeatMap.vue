<template>
  <div class="hello" ref="chartdiv">
  </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import geoData from '@amcharts/amcharts5-geodata/malawiLow'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import conditionService from '../../../../services/ConditionService'


export default {
  data() {
    return {
      conditions: null,
      condition_to_ignore1: 'Acute hemorrhagic fever syndrome (Ebola, Marburg, Lassa Fever, Rift Valley Fever (RVF), Crimean-Congo) ',
      condition_to_ignore2: 'Any public health event of international concern (infectious, zoonotic, food borne, chemical, radio nuclear or due to an unknown condition)',
      locations: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "New York City"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [-73.778137, 40.641312]
          }
        }, 

        {
          "type": "Feature",
          "properties": {
            "name": "London"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [-0.454296, 51.470020]
          }
        }, 
        
        {
          "type": "Feature",
          "properties": {
            "name": "Beijing "
          },
          "geometry": {
            "type": "Point",
            "coordinates": [35.066480, -15.874580]
          }
        },

        {
          "type": "Feature",
          "properties": {
            "name": "Lilongwe"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [33.774119, -13.937149]
          }
        }, 
       ]
      }
    }
  },
  methods: {
    async legendData() {
      const data = []
      const conditions = (await conditionService.index()).data
      conditions.forEach(condition => {
        //console.log(condition)
        if(condition.name !== this.condition_to_ignore2) {
          if (condition.name !== this.condition_to_ignore1) {
            if(condition.color !== null)
            data.push({
              name: condition.name,
              color: am5.color(condition.color)
            })
          }
        }
      })
      return data
    },
    async loadMap() {
      let root = am5.Root.new(this.$refs.chartdiv)
      root.setThemes([am5themes_Animated.new(root)])
      let chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "rotateX",
          panY: "none",
          projection: am5map.geoNaturalEarth1(),
          layout: root.verticalLayout
    
        })
      )
      // Create polygon series
      var polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON:  geoData,
          exclude: ["AQ"]
        })
      )
      // GeoJSON data
      //Create point series
      var pointSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {
          geoJSON: this.locations
        })
      )
      //
      pointSeries.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: am5.color("#686t")
          })
        });
      });
      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {
        nameField: "name",
        fillField: "color",
        strokeField: "color",
        centerX: am5.percent(70),
        x: am5.percent(95),
        layout: root.verticalLayout
      }));
      //
      legend.data.setAll(await this.legendData())
    }
  },
  async mounted() {
    this.loadMap()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 89%;
  background-color: rgb(255, 255, 255);
}
</style>