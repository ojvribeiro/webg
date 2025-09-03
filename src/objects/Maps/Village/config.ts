interface MapConfig {
  SHOW_OBJECT_INFO: boolean
  SHOW_COLLISION_BOX: boolean
}

/**
 * @type `mapConfig` - The map configuration
 * @property `SHOW_OBJECT_INFO` - Whether to show the objects' info
 * @property `SHOW_COLLISION_BOX` - Whether to show the objects' hitboxes
 */
const mapConfig: MapConfig = {
  SHOW_OBJECT_INFO: false,

  SHOW_COLLISION_BOX: false,
}

export { mapConfig }
