const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver.assetExts = Array.from(
  new Set([...(config.resolver.assetExts || []), 'glb', 'gltf', 'obj', 'ply', 'onnx', 'data'])
)

module.exports = withNativeWind(config, { input: './global.css' })
