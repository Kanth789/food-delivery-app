import imageBuilder from '@sanity/image-url'
import {createClient} from '@sanity/client'

export const client = createClient({
    projectId:'k605j5jb',
    dataset:'production',
    useCdn:true,
    apiVersion:'2024-02-13'
  })
export const builder = imageBuilder(client)
export const urlFor = source => builder.image(source)