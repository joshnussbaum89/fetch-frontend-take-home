import styles from './SectionHeader.module.css'

export default function SectionHeader({ text }: { text: string }) {
  return <h2 className={styles.header}>{text}</h2>
}
