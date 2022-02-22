<template>
  <v-container
    id="google-maps"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <base-material-card
          color="success"
          title="IDSR Cases on a map"
          class="px-5 py-3"
        >
          <v-card-text class="px-0 pb-0">
            <v-sheet>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2974585.086043762!2d34.430016739943966!3d-13.32092079888026!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smw!4v1645539920612!5m2!1sen!2smw"
                width="100%"
                height="1450px"
                frameborder="0"
                style="border:0"
                allowfullscreen
              />
            </v-sheet>
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
       
       
      </v-col>
    </v-row>
  </v-container>
</template>
