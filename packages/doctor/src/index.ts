import getFiles from './getFiles';
import Analyzer from './Analyzer';
import Scanner from './Scanner';
import { IDoctorOptions } from './types/Doctor';
import { IScanOptions, IScannerReports } from './types/Scanner';
import { IFileInfo } from './types/File';

// Ignore directories
const defaultignore = ['build', 'es', 'dist', 'lib', 'mocks', 'coverage', 'node_modules', 'demo', 'examples', 'public', 'test', '__tests__'];
class Doctor {
  public options: any;

  public ignore: string[];

  private scanner: any;

  private analyzer: any;

  constructor(options: IDoctorOptions) {
    this.options = options || {};

    this.ignore = defaultignore.concat(this.options.ignore || []);

    this.scanner = new Scanner({ ignore: this.ignore });

    this.analyzer = new Analyzer({ ignore: this.ignore });
  }

  scan(directory: string, options?: IScanOptions): Promise<IScannerReports> {
    return this.scanner.scan(directory, options);
  }

  analyse(directory: string) {
    return this.analyzer.analyse(directory);
  }

  getFiles(directory: string): IFileInfo[] {
    return getFiles(directory, this.ignore);
  }
}

export { Doctor };
