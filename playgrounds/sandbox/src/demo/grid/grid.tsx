import { Grid, Switch } from '@arco-design/web-solid'
import { createSignal } from 'solid-js'
import styles from './styles/grid.module.css'

const { GridItem } = Grid

const App = () => {
  const [collapsed, setCollapsed] = createSignal(false)
  return (
    <div style={{ width: '100%' }}>
      <div style={{ 'margin-bottom': '20px' }}>
        折叠：
        <Switch
          checked={collapsed()}
          onChange={() => {
            setCollapsed(p => !p)
          }}
        />
      </div>
      <Grid
        collapsed={collapsed()}
        cols={3}
        colGap={12}
        rowGap={16}
        class={styles['grid-demo-grid']}
      >
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']} offset={1}>
          item | offset - 1
        </GridItem>
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']} span={3}>
          item | span - 3
        </GridItem>
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']}>item</GridItem>
        <GridItem class={styles['demo-item']} suffix>
          {({ overflow }) => `suffix | overflow: ${!!overflow}`}
        </GridItem>
      </Grid>
    </div>
  )
}

export default App
