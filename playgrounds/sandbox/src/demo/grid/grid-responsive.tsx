import { Grid } from '@arco-design/web-solid'
import styles from './styles/grid-responsive.module.css'
const { GridItem } = Grid

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <Grid
        cols={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
        colGap={12}
        rowGap={16}
        class={styles['grid-responsive-demo']}
      >
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']} span={{ xl: 4, xxl: 6 }} suffix>
          suffix
        </GridItem>
      </Grid>
    </div>
  )
}

export default App
