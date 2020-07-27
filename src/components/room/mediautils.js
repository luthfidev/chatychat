export default async function getLocationAsync(onSend) {
  const location = await Location.getCurrentPositionAsync({});
  if (location) {
    onSend([{location: location.coords}]);
  }
}
