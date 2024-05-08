<script>
    import { useThrelte, useTask } from '@threlte/core'
    import { onMount } from 'svelte'
    import {
      EffectComposer,
      EffectPass,
      RenderPass,
      SMAAEffect,
      SMAAPreset,
      BloomEffect,
      KernelSize,
	  VignetteEffect,
    } from 'postprocessing'
  
    const { scene, renderer, camera, size } = useThrelte()
  
    // Adapt the default WebGLRenderer: https://github.com/pmndrs/postprocessing#usage
    const composer = new EffectComposer(renderer)
  
    const setupEffectComposer = (/** @type {import("three").Camera | undefined} */ camera) => {
        composer.removeAllPasses();
  composer.addPass(new RenderPass(scene, camera));

  // Existing Bloom and SMAA effects
  const bloomEffect = new BloomEffect({
    intensity: 6,
    luminanceThreshold: 0.15,
    height: 512,
    width: 512,
    luminanceSmoothing: 0.08,
    mipmapBlur: true,
    kernelSize: KernelSize.MEDIUM
  });
  const smaaEffect = new SMAAEffect({ preset: SMAAPreset.LOW });

  
  // New Vignette effect
  const vignetteEffect = new VignetteEffect({
    eskil: false,
    offset: 0.2,
    darkness: 0.75
  });


  const effectPass = new EffectPass(camera, bloomEffect, smaaEffect, vignetteEffect, );
  composer.addPass(effectPass);

    }
  
    // We need to set up the passes according to the camera in use
    $: setupEffectComposer($camera)
    $: composer.setSize($size.width, $size.height)
  
    const { renderStage, autoRender } = useThrelte()
  
    // We need to disable auto rendering as soon as this component is
    // mounted and restore the previous state when it is unmounted.
    onMount(() => {
        
      let before = autoRender.current
      autoRender.set(false)
      return () => autoRender.set(before)
    })
  
    useTask((delta) => {
      composer.render(delta)
    }, { stage: renderStage, autoInvalidate: false })
  </script>
  