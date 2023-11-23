import styles from './page.module.css'
import ImageUploader from './ImageUploader'

export default function Home() {
  return (
    <main className={styles.main}>
        <h1>google vision</h1>
        <h2>Select your image</h2>
        <ImageUploader />
    </main>
  )
}
