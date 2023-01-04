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
import geographicCaseService from '../../../../services/GeographicCaseService'

export default {
  data() {
    return {
      geographicCaseData: null,
      caseColors: null,
      conditions: null,
      condition_to_ignore1: 'Acute hemorrhagic fever syndrome (Ebola, Marburg, Lassa Fever, Rift Valley Fever (RVF), Crimean-Congo) ',
      condition_to_ignore2: 'Any public health event of international concern (infectious, zoonotic, food borne, chemical, radio nuclear or due to an unknown condition)',
    }
  },
  methods: {
    //
    async legendData() {
      const data = []
      this.conditions.forEach(condition => {
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
    //
    async loadMap() {
      let root = am5.Root.new(this.$refs.chartdiv)
      root.setThemes([am5themes_Animated.new(root)])
      let chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "none",
          panY: "none",
          projection: am5map.geoNaturalEarth1(),
          layout: root.horizontalLayout
        })
      )
      //
      var cont = chart.children.push(
        am5.Container.new(root, {
          layout: root.horizontalLayout,
          x: 20,
          y: 40
        })
      );
      // Add labels and controls
      cont.children.push(
        am5.Label.new(root, {
          centerY: am5.p50,
          text: "Malawi"
        })
      );
      // Create polygon series
      var polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON:  geoData,
          exclude: ["AQ"]
        })
      )
      var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}))
      //var colorset = am5.ColorSet.new(root, {})
      const array = this.caseColors
      const colors = array.values()
      const colors2 = array.values()
      
      pointSeries.bullets.push(function () {
        var container = am5.Container.new(root, {})
        //center dot
        var circle2 = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            tooltipY: 0,
            fill: am5.color(colors2.next().value),
            strokeOpacity: 2,
            tooltipText: "{title}"
          })
        );
        // outer dot
        var circle = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            tooltipY: 0,
            fill: am5.color(colors.next().value),
            strokeOpacity: 5,
            tooltipText: "{title}"
          })
        );

        circle.animate({
          key: "scale",
          from: 1,
          to: 5,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        });
        circle.animate({
          key: "opacity",
          from: 1,
          to: 0,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        });

        return am5.Bullet.new(root, {
          sprite: container
        })
      })
      //add location
      for (var i = 0; i < this.geographicCaseData.length; i++) {
        var location = this.geographicCaseData[i]
        // computer intensive resource use
        // for(var J = 0; J < location.count; J++) {
        //   console.log(location.color)
        //   const label = location.name +': '+location.condition_name +': '+location.count
        //   addLocation(location.longitude, location.latitude, label)
        // }
        console.log(location.count)
        if (location.count) {
          const label = location.name +': '+location.condition_name +': '+location.count
          addLocation(location.longitude, location.latitude, label)
        }
        //addLocation(location.longitude, location.latitude, location.name)
      }

      function generateRandomNumber() {
          return Math.random() * 0.08
      }

      function addLocation(longitude, latitude, name) {
        longitude = parseFloat(longitude) + parseFloat(generateRandomNumber())
        latitude  = parseFloat(latitude) + parseFloat(generateRandomNumber())
        pointSeries.data.push({
          geometry: { type: "Point", coordinates: [longitude, latitude] },
          title: name,
        })
      }


      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {
        nameField: "name",
        fillField: "color",
        strokeField: "color",
        layout: root.verticalLayout
      }))
      //
      legend.data.setAll((await this.legendData()))
      // Make stuff animate on load
      chart.appear(1000, 100)
    },
    toArrayOfColors(obj) {
      const conditions = this.conditions
      function FindColor(_name) {
        let color
        conditions.forEach(condition => {
            if(condition.name == _name) {
              color = condition.color
            }
          })

        return color
      }
      //
      const array = []
      obj.forEach(item => {
        // computer intensive resource use
        // for(var J = 0; J < item.count; J++) {
        //   array.push(
        //     FindColor(item.condition_name)
        //   )
        // }
        array.push(
            FindColor(item.condition_name)
          )
      })
      //
      return array
    },
  },
  async mounted() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: false,
      loader: 'spinner',
      width: 100,
      height: 64,
    })
    this.conditions = (await conditionService.index()).data
    this.geographicCaseData =  (await geographicCaseService.index()).data

    var output = [];
    this.geographicCaseData.forEach(function(item) {
      var existing = output.filter(function(v, i) {
        return v.name == item.name && v.condition_name == item.condition_name
      })

      if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        output[existingIndex].count += parseInt(item.count);
      } else {
        if (typeof item.count == 'string')
          item.count = [item.count];
        output.push(item);
      }
    })
    this.geographicCaseData = output

    if(this.geographicCaseData) {
      if(this.conditions)
      this.caseColors = this.toArrayOfColors(this.geographicCaseData)
    }
    this.loadMap()
    loader.hide()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
}
</style>