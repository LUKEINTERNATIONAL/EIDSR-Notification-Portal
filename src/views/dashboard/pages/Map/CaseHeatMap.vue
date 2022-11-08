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
      condition_to_ignore1: 'Acute hemorrhagic fever syndrome (Ebola, Marburg, Lassa Fever, Rift Valley Fever (RVF), Crimean-Congo) ',
      condition_to_ignore2: 'Any public health event of international concern (infectious, zoonotic, food borne, chemical, radio nuclear or due to an unknown condition)',
      cities: [
        {
          title: "Lilongwe",
          latitude: -13.937149,
          longitude: 33.774119,
          color: '#e6b7f6'
        },
        {
          title: "Sadzi",
          latitude: -15.874580,
          longitude: 35.066480,
          color: '#af4e15'
        },
      ] 
    }
  },
  methods: {
    //
    async legendData() {
      const data = []
      const conditions = (await conditionService.index()).data
      conditions.forEach(condition => {
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
      var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
      var colorset = am5.ColorSet.new(root, {});

      pointSeries.bullets.push(function () {
        var container = am5.Container.new(root, {})

        console.log(colorset.next())

        var circle = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            tooltipY: 0,
            fill: colorset.next(),
            strokeOpacity: 0,
            tooltipText: "{title}"
          })
        );

        var circle2 = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            tooltipY: 0,
            fill: colorset.next(),
            strokeOpacity: 0,
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
      for (var i = 0; i < this.cities.length; i++) {
        var city = this.cities[i];
        addCity(city.longitude, city.latitude, city.title, city.color);
      }

      function addCity(longitude, latitude, title, color) {
        pointSeries.data.push({
          geometry: { type: "Point", coordinates: [longitude, latitude] },
          title: title,
          color: color
        });
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
      chart.appear(1000, 100);
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