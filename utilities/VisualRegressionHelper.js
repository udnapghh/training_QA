// VisualRegressionHelper: membandingkan screenshot current dengan baseline
// Menggunakan pixelmatch + pngjs sesuai panduan materi
const fs = require('fs');
const path = require('path');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

class VisualRegressionHelper {
  constructor() {
    this.screenshotDir = path.join(__dirname, '..', 'screenshots');
    this.baselineDir = path.join(this.screenshotDir, 'baseline');
    this.currentDir = path.join(this.screenshotDir, 'current');
    this.diffDir = path.join(this.screenshotDir, 'diff');

    [this.baselineDir, this.currentDir, this.diffDir].forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  // imageName contoh: 'login_success.png'
  // Current screenshot diharapkan sudah ada di screenshots/current/<imageName>
  async compareImages(imageName, threshold = 0.1) {
    const baselinePath = path.join(this.baselineDir, imageName);
    const currentPath = path.join(this.currentDir, imageName);
    const diffPath = path.join(this.diffDir, imageName);

    if (!fs.existsSync(currentPath)) {
      throw new Error(`Current screenshot tidak ditemukan: ${currentPath}`);
    }

    // Jika baseline belum ada -> jadikan current sebagai baseline (first run)
    if (!fs.existsSync(baselinePath)) {
      fs.copyFileSync(currentPath, baselinePath);
      return {
        hasBaseline: false,
        match: true,
        diffPixels: 0,
        matchPercentage: 100,
        message: 'Baseline created',
      };
    }

    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const current = PNG.sync.read(fs.readFileSync(currentPath));

    // Jika dimensi berbeda, anggap tidak match
    if (
      baseline.width !== current.width ||
      baseline.height !== current.height
    ) {
      return {
        hasBaseline: true,
        match: false,
        diffPixels: -1,
        matchPercentage: 0,
        message: 'Dimensi gambar berbeda antara baseline dan current',
      };
    }

    const { width, height } = baseline;
    const diff = new PNG({ width, height });

    const diffPixels = pixelmatch(
      baseline.data,
      current.data,
      diff.data,
      width,
      height,
      { threshold },
    );

    // Simpan gambar diff
    fs.writeFileSync(diffPath, PNG.sync.write(diff));

    const totalPixels = width * height;
    const matchPercentage = ((totalPixels - diffPixels) / totalPixels) * 100;
    const match = diffPixels === 0;

    return {
      hasBaseline: true,
      match,
      diffPixels,
      matchPercentage: Number(matchPercentage.toFixed(2)),
      message: match
        ? 'Visual regression passed'
        : `Terdapat perbedaan visual: ${diffPixels} pixel`,
    };
  }
}

module.exports = VisualRegressionHelper;
