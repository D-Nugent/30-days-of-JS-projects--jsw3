const heroData = () => {
  return ({
    _heroHealth: 300,
    _heroAP: 80,
    useAttackRegular(target){
      target.reduceHealth(40);
    },
    useAttack
  })
}