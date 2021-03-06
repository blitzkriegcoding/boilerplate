import ora from 'ora'
import chalk from 'chalk'
import webpack from 'webpack'
import webpackConfig from '../webpack/production'

const spinner = ora(chalk.cyan('Building project'))

process.stdout.write('\n')
spinner.start()

webpack(webpackConfig, (error, stats) => {
  if (error) {
    spinner.fail(chalk.red('Something wrong happened:\n'))

    throw error
  }

  process.stdout.write('\n\n' + stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  spinner.succeed(chalk.green('Build finished with success!\n'))
})
