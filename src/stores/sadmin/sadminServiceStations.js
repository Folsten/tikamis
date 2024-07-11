import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSadminServiceStationsStore = defineStore(
  'sadminServiceStations',
  () => {
    let serviceStations = ref([]);

    function $reset() {
      serviceStations.value = [];
    }

    function getSelectedServiceStation() {
      let result;
      serviceStations.value.forEach((station) => {
        if (station.isSelected) {
          result = station;
        }
      });
      return result;
    }

    function setNewSelectedServiceStation(id) {
      serviceStations.value.forEach((station) => {
        station.isSelected = station.id === id;
      });
    }

    return { serviceStations, getSelectedServiceStation, setNewSelectedServiceStation, $reset };
  },
  {
    persist: true
  }
);
